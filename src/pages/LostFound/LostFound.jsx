import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { fetchLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import {
  getLostFoundStableId,
  getNormalizedLostFoundStatus,
  normalizeLostFoundRecords,
  pickReunionStory,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import defaultPhoto from "../../images/svgfiles/avatar-1.svg";
import { LostFoundReportCard } from "./LostFoundSwipeDeck";
import { LostFoundContactReporterModal } from "./LostFoundContactReporterModal";
import { LostFoundPetPhoto } from "./LostFoundPetPhoto";

const PAGE_SIZE = 20;
const FIRST_PAGE_NO = 0;

const DEFAULT_FILTERS = {
  status: "ALL",
  petType: "",
  breed: "",
  color: "",
  gender: "ALL",
  country: "",
  state: "",
  city: "",
  radius: "",
};

function hasActiveFilters(filters) {
  return Object.entries(filters).some(([key, value]) => {
    const normalized = String(value || "").trim();
    if (!normalized) return false;
    if (key === "status" || key === "gender") return normalized !== "ALL";
    return true;
  });
}

function buildLostFoundQueryParams(filters, pageNo, userCoords) {
  const params = {
    pageNo,
    pageSize: PAGE_SIZE,
  };

  const activeFilters = hasActiveFilters(filters);
  if (activeFilters) params.useQueryFilter = true;

  if (filters.status && filters.status !== "ALL") params.status = filters.status;
  if (filters.gender && filters.gender !== "ALL") params.gender = filters.gender;

  ["petType", "breed", "color", "country", "state", "city"].forEach((key) => {
    const value = String(filters[key] || "").trim();
    if (value) params[key] = value;
  });

  const radius = String(filters.radius || "").trim();
  if (radius) {
    if (!userCoords) {
      return { error: "Location is required for radius search.", params: null };
    }
    params.radius = radius;
    params.lat = userCoords.lat;
    params.long = userCoords.long;
  }

  return { params, error: "" };
}

function hashString(value) {
  let hash = 0;
  const str = String(value || "");
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function stableShuffleRecords(records) {
  return records
    .map((record, index) => ({
      record,
      index,
      rank: hashString(getLostFoundStableId(record) || record?.uid || `${index}-${JSON.stringify(record)}`),
    }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map(({ record }) => record);
}

function matchesFreeTextSearch(record, searchText) {
  const needle = String(searchText || "").trim().toLowerCase();
  if (!needle) return true;

  return [
    record?.name,
    record?.petType,
    record?.breed,
    record?.color,
    record?.gender,
    record?.status,
    record?.description,
    record?.country,
    record?.state,
    record?.city,
    record?.location?.country,
    record?.location?.state,
    record?.location?.city,
  ].some((value) => String(value || "").toLowerCase().includes(needle));
}

function variantForReport(record) {
  const status = getNormalizedLostFoundStatus(record) || String(record?.status || "").trim().toUpperCase();
  if (status === "FOUND") return "found";
  if (status === "REUNITED") return "reunited";
  return "lost";
}

function useUserGeo() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        }),
      () => setCoords(null),
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 8000 }
    );
  }, []);

  return coords;
}

export const LostFoundPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userCoords = useUserGeo();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [searchText, setSearchText] = useState("");
  const [appliedSearchText, setAppliedSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pageNo, setPageNo] = useState(FIRST_PAGE_NO);
  const [queryVersion, setQueryVersion] = useState(0);
  const [contactModalReport, setContactModalReport] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const loadReports = useCallback(
    async (nextFilters, nextPageNo) => {
      const { params, error } = buildLostFoundQueryParams(nextFilters, nextPageNo, userCoords);
      if (error) {
        toast.warning(error);
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const record = await fetchLostAndFound(params);
        setItems(normalizeLostFoundRecords(record));
      } catch (error) {
        toast.error(String(error?.message || error));
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [userCoords]
  );

  useEffect(() => {
    if (!currentUser) return;
    loadReports(appliedFilters, pageNo);
  }, [appliedFilters, currentUser, loadReports, pageNo, queryVersion]);

  const { gridItems, reunitedSorted } = useMemo(() => {
    const requestedStatus = String(appliedFilters.status || "ALL").toUpperCase();
    const activeRows = [];
    const reunitedRows = [];

    items.forEach((item) => {
      const status = getNormalizedLostFoundStatus(item) || String(item?.status || "").trim().toUpperCase();
      if (requestedStatus === "REUNITED") {
        if (status === "REUNITED" && matchesFreeTextSearch(item, appliedSearchText)) activeRows.push(item);
        return;
      }
      if (status === "REUNITED") {
        reunitedRows.push(item);
        return;
      }
      if (matchesFreeTextSearch(item, appliedSearchText)) activeRows.push(item);
    });

    return {
      gridItems: stableShuffleRecords(activeRows),
      reunitedSorted: reunitedRows,
    };
  }, [appliedFilters.status, appliedSearchText, items]);

  const hasAnyReports = items.length > 0;
  const canGoNext = items.length >= PAGE_SIZE;

  const handleFilterChange = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
    setPageNo(FIRST_PAGE_NO);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const { error } = buildLostFoundQueryParams(filters, FIRST_PAGE_NO, userCoords);
    if (error) {
      toast.warning(error);
      return;
    }
    setPageNo(FIRST_PAGE_NO);
    setAppliedFilters(filters);
    setAppliedSearchText(searchText);
    setQueryVersion((version) => version + 1);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSearchText("");
    setAppliedSearchText("");
    setShowFilters(false);
    setPageNo(FIRST_PAGE_NO);
    setQueryVersion((version) => version + 1);
  };

  const goToPrevPage = () => {
    setPageNo((current) => Math.max(FIRST_PAGE_NO, current - 1));
  };

  const goToNextPage = () => {
    if (!canGoNext) return;
    setPageNo((current) => current + 1);
  };

  return (
    <>
      <StyledLostFound>
        <div className="nav">
          <Navbar />
        </div>
        <div className="top">
          <div className="top-shade" aria-hidden />
          <div className="banner">
            <h1>Lost & Found</h1>
            <p>Search community reports and help pets get home.</p>
          </div>
          <div className="wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <div className="content">
          <div className="lost-found-toolbar">
            <form className="lost-found-filter-panel" onSubmit={handleSearch}>
              <div className="search-row">
                <div className="search-input-wrap">
                  <label className="sr-only" htmlFor="lf-free-search">
                    Search reports
                  </label>
                  <input
                    id="lf-free-search"
                    className="free-search-input"
                    value={searchText}
                    onChange={(event) => {
                      setSearchText(event.target.value);
                      setPageNo(FIRST_PAGE_NO);
                    }}
                    placeholder="Search by name, pet type, breed, color, city..."
                  />
                </div>
                <div className="search-buttons">
                  <button type="submit" className="primary">
                    Search
                  </button>
                  <button
                    type="button"
                    className={`filter-btn ${showFilters ? "active" : ""}`}
                    aria-expanded={showFilters}
                    onClick={() => setShowFilters((open) => !open)}
                  >
                    Filters
                  </button>
                  <button type="button" className="outline" onClick={handleClearFilters}>
                    Clear
                  </button>
                </div>
              </div>
              {showFilters ? (
                <div className="advanced-filter-grid">
                  <div className="filter-field">
                    <label htmlFor="lf-status">Status</label>
                    <select
                      id="lf-status"
                      value={filters.status}
                      onChange={(event) => handleFilterChange("status", event.target.value)}
                    >
                      <option value="ALL">ALL</option>
                      <option value="LOST">LOST</option>
                      <option value="FOUND">FOUND</option>
                      <option value="REUNITED">REUNITED</option>
                    </select>
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-pet-type">Pet type</label>
                    <input
                      id="lf-pet-type"
                      value={filters.petType}
                      onChange={(event) => handleFilterChange("petType", event.target.value)}
                      placeholder="dog"
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-breed">Breed</label>
                    <input
                      id="lf-breed"
                      value={filters.breed}
                      onChange={(event) => handleFilterChange("breed", event.target.value)}
                      placeholder="golden"
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-color">Color</label>
                    <input
                      id="lf-color"
                      value={filters.color}
                      onChange={(event) => handleFilterChange("color", event.target.value)}
                      placeholder="brown"
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-gender">Gender</label>
                    <select
                      id="lf-gender"
                      value={filters.gender}
                      onChange={(event) => handleFilterChange("gender", event.target.value)}
                    >
                      <option value="ALL">ALL</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="unknown">unknown</option>
                    </select>
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-country">Country</label>
                    <input
                      id="lf-country"
                      value={filters.country}
                      onChange={(event) => handleFilterChange("country", event.target.value)}
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-state">State</label>
                    <input
                      id="lf-state"
                      value={filters.state}
                      onChange={(event) => handleFilterChange("state", event.target.value)}
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-city">City</label>
                    <input
                      id="lf-city"
                      value={filters.city}
                      onChange={(event) => handleFilterChange("city", event.target.value)}
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="lf-radius">Radius</label>
                    <input
                      id="lf-radius"
                      type="number"
                      min="0"
                      step="0.1"
                      value={filters.radius}
                      onChange={(event) => handleFilterChange("radius", event.target.value)}
                      placeholder="km"
                    />
                  </div>
                </div>
              ) : null}
            </form>
            <div className="toolbar-actions compact">
              <button type="button" className="outline" onClick={() => navigate("/lost-found/match-requests")}>
                Requests for my found pets
              </button>
              <button type="button" className="outline" onClick={() => navigate("/lost-found/report?mode=lost")}>
                Report lost pet
              </button>
              <button type="button" className="primary" onClick={() => navigate("/lost-found/report?mode=found")}>
                Report found pet
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <FadeLoader color="#f06a8a" />
            </div>
          ) : !hasAnyReports ? (
            <div className="empty">No matching reports found.</div>
          ) : (
            <>
              {gridItems.length > 0 ? (
                <section className="lost-found-results-zone" aria-label="Lost and found search results">
                  <div className="lost-found-results-grid">
                    {gridItems.map((row, index) => {
                      const id = getLostFoundStableId(row) || row.uid || index;
                      const variant = variantForReport(row);
                      return (
                        <div className={`lost-found-result-card result-card-${variant}`} key={`${id}-${index}`}>
                          <div className="lf-card-ambient lf-can-hover">
                            <LostFoundReportCard
                              variant={variant}
                              item={row}
                              userCoords={userCoords}
                              defaultPhoto={defaultPhoto}
                              onViewDetails={(rowId) => navigate(`/lost-found/${encodeURIComponent(rowId)}`)}
                              onReportSighting={(rowId) => navigate(`/lost-found/${encodeURIComponent(rowId)}/sighting`)}
                              onNotifyNoId={() => toast.info("This report has no id yet.")}
                              onContactReporter={(report) => setContactModalReport(report)}
                              onNotifyNoContact={() =>
                                toast.info("This reporter has not shared contact details (or none are visible).")
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : (
                <div className="empty">No matching reports found.</div>
              )}

              <div className="lost-found-pagination" aria-label="Lost and found pagination">
                <button
                  type="button"
                  className="pill"
                  onClick={goToPrevPage}
                  disabled={pageNo === FIRST_PAGE_NO || loading}
                >
                  Previous
                </button>
                <span className="pagination-page">Page {pageNo}</span>
                <button type="button" className="pill" onClick={goToNextPage} disabled={!canGoNext || loading}>
                  Next
                </button>
              </div>

              {appliedFilters.status !== "REUNITED" && reunitedSorted.length > 0 ? (
                <section className="reunited-zone" aria-labelledby="reunited-pets-heading">
                  <div className="reunited-zone-head">
                    <h2 id="reunited-pets-heading" className="reunited-zone-title">
                      Reunited pets
                    </h2>
                    <p className="reunited-zone-sub">
                      Happy endings from the MILO community — these pets are safely back with their families.
                    </p>
                  </div>
                  <div className="reunited-cards">
                    {reunitedSorted.map((row) => {
                      const id = getLostFoundStableId(row);
                      const story = pickReunionStory(row);
                      const snippet =
                        story.message || "Marked as reunited — thank you to everyone who helped along the way.";
                      return (
                        <article key={id || row.uid || JSON.stringify(row)} className="reunited-card">
                          <div className="reunited-card-photo">
                            <LostFoundPetPhoto record={row} fallbackSrc={defaultPhoto} alt={row?.name || "Pet"} />
                          </div>
                          <div className="reunited-card-body">
                            <span className="reunited-card-badge">Reunited</span>
                            <h3 className="reunited-card-name">{row?.name || "Pet"}</h3>
                            <p className="reunited-card-snippet">{snippet}</p>
                            <button
                              type="button"
                              className="pill"
                              onClick={() => navigate(`/lost-found/${encodeURIComponent(id)}`)}
                            >
                              View story
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </StyledLostFound>
      <LostFoundContactReporterModal
        isOpen={!!contactModalReport}
        onClose={() => setContactModalReport(null)}
        report={contactModalReport}
      />
      <Footer />
    </>
  );
};

export default LostFoundPage;
