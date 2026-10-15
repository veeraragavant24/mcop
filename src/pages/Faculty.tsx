
import React, { useMemo, useState } from "react";

type FacultyMember = {
  id: number;
  name: string;
  designation: string;
  department: string;
  image: string;
  qualifications: string[];
  experience: string;
  specialization: string[];
  biography: string;
  research: string;
};

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "V Rathnamala",
    designation: "Professor & Head",
    department: "Orthopaedic",
    image: "/managementand faculty/V Rathnamala.png",
    qualifications: ["BPT", "MPT (Orthopaedics)", "Ph.D. (Physiotherapy)"],
    experience: "Academic teaching and clinical practice",
    specialization: [
      "Orthopaedic Rehabilitation",
      "Sports Physiotherapy",
      "Musculoskeletal Rehabilitation",
    ],
    biography:
      "Dedicated to physiotherapy education, clinical practice, and the professional development of students. Focuses on evidence-based rehabilitation and practical clinical learning.",
    research:
      "Musculoskeletal rehabilitation, clinical education, and evidence-based physiotherapy.",
  },
  {
    id: 2,
    name: "P.Sowmya",
    designation: "Associate Professor",
    department: "Neurological",
    image: "/managementand faculty/P. Sowmya.png",
    qualifications: ["BPT", "MPT (Neurology)"],
    experience: "Academic teaching and neurological rehabilitation",
    specialization: [
      "Neurological Rehabilitation",
      "Movement Disorders",
      "Patient Rehabilitation",
    ],
    biography:
      "Committed to developing students' clinical reasoning and patient-care skills through academic learning and practical exposure.",
    research:
      "Neurological rehabilitation, functional recovery, and physiotherapy education.",
  },
  {
    id: 3,
    name: "S.D.Shanmugapriya",
    designation: "Assistant Professor",
    department: "Cardiopulmonary",
    image: "/managementand faculty/S. D. Shanmugapriya.png",
    qualifications: ["BPT", "MPT (Cardiopulmonary)"],
    experience: "Teaching and cardiopulmonary physiotherapy",
    specialization: [
      "Cardiopulmonary Rehabilitation",
      "Exercise Therapy",
      "Clinical Assessment",
    ],
    biography:
      "Supports students in developing practical assessment, therapeutic exercise, and rehabilitation skills for cardiopulmonary care.",
    research:
      "Cardiopulmonary rehabilitation, therapeutic exercise, and clinical assessment.",
  },
  {
    id: 4,
    name: "S.Yamuna Devi",
    designation: "Assistant Professor",
    department: "Musculoskeletal",
    image: "/managementand faculty/S. Yamuna Devi.png",
    qualifications: ["BPT", "MPT (Musculoskeletal Physiotherapy)"],
    experience: "Teaching and musculoskeletal clinical practice",
    specialization: [
      "Musculoskeletal Physiotherapy",
      "Manual Therapy",
      "Functional Rehabilitation",
    ],
    biography:
      "Passionate about student mentoring, hands-on clinical training, and helping students apply physiotherapy principles to patient care.",
    research:
      "Musculoskeletal rehabilitation, manual therapy, and functional recovery.",
  },
  {
    id: 5,
    name: "Sai Kripa Raman",
    designation: "Assistant Professor",
    department: "Orthopaedic",
    image: "/managementand faculty/Sai Kripa Raman.png",
    qualifications: ["BPT", "MPT"],
    experience: "Academic teaching and clinical practice",
    specialization: [
      "Orthopaedic Physiotherapy",
      "Rehabilitation",
      "Clinical Practice",
    ],
    biography:
      "Contributes to academic teaching, clinical skill development, and student learning in physiotherapy.",
    research: "Orthopaedic rehabilitation and physiotherapy education.",
  },
  {
    id: 6,
    name: "T.Saloni",
    designation: "Lecturer",
    department: "Neurological",
    image: "/managementand faculty/T. Saloni.png",
    qualifications: ["BPT", "MPT"],
    experience: "Teaching and practical training",
    specialization: [
      "Neurological Physiotherapy",
      "Functional Training",
      "Patient Care",
    ],
    biography:
      "Focuses on supporting students through structured academic instruction and practical physiotherapy training.",
    research: "Neurological physiotherapy and functional rehabilitation.",
  },
  {
    id: 7,
    name: "P.Kishore Kumar",
    designation: "Lecturer",
    department: "Neurological",
    image: "/managementand faculty/P. Kishore Kumar.png",
    qualifications: ["BPT", "MPT"],
    experience: "Teaching and practical training",
    specialization: [
      "Neurological Physiotherapy",
      "Functional Training",
      "Patient Care",
    ],
    biography:
      "Focuses on supporting students through structured academic instruction and practical physiotherapy training.",
    research: "Neurological physiotherapy and functional rehabilitation.",
  },
];

const departments = [
  "All Faculty",
  
];

export default function Faculty() {
  const [activeDepartment, setActiveDepartment] =
    useState("All Faculty");
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] =
    useState<FacultyMember | null>(null);

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    return facultyMembers.filter((faculty) => {
      const matchesDepartment =
        activeDepartment === "All Faculty" ||
        faculty.department === activeDepartment;

      const matchesSearch =
        !query ||
        faculty.name.toLowerCase().includes(query) ||
        faculty.designation.toLowerCase().includes(query) ||
        faculty.department.toLowerCase().includes(query) ||
        faculty.specialization.some((item) =>
          item.toLowerCase().includes(query)
        );

      return matchesDepartment && matchesSearch;
    });
  }, [activeDepartment, search]);

  const openProfile = (faculty: FacultyMember) => {
    setSelectedFaculty(faculty);
  };

  return (
    <main className="faculty-page">
      <style>{`
        .faculty-page {
          --faculty-forest: #003b2b;
          --faculty-dark: #00251a;
          --faculty-gold: #d6a83f;
          --faculty-gold-light: #f6d77f;
          --faculty-cream: #fbf8f0;
          --faculty-text: #24332b;

          min-height: 100vh;
          color: var(--faculty-text);
          background: var(--faculty-cream);
          font-family: Arial, Helvetica, sans-serif;
        }

        .faculty-page *,
        .faculty-page *::before,
        .faculty-page *::after {
          box-sizing: border-box;
        }

        .faculty-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 42px 5% 65px;
        }

        /* Page heading */
        .faculty-heading {
          margin-bottom: 30px;
          text-align: center;
        }

        .faculty-eyebrow {
          margin: 0 0 10px;
          color: #9c7627;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .faculty-title {
          margin: 0;
          color: var(--faculty-forest);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 48px);
          line-height: 1.2;
        }

        .faculty-title span {
          color: #b88b2e;
        }

        .faculty-subtitle {
          max-width: 700px;
          margin: 12px auto 0;
          color: #606b63;
          font-size: 14px;
          line-height: 1.8;
        }

.faculty-heading-line {
  position: relative;
  left: 50%;
  width: 100vw;
  max-width: 100vw;
  height: 3px;
  margin: 35px 0 0;
  transform: translateX(-50%);

  background: linear-gradient(
    90deg,
    #b88b2e,
    #ffe6a0,
    #d6a83f,
    #ffe6a0,
    #b88b2e
  );

  box-shadow: 0 2px 10px rgba(214, 168, 63, 0.3);
}

        /* Search */
        .faculty-search-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }

        .faculty-result-count {
          color: #5d6a61;
          font-size: 13px;
        }

        .faculty-search {
          width: 280px;
          max-width: 100%;
          padding: 12px 15px;
          border: 1px solid #d8c79b;
          border-radius: 7px;
          outline: none;
          color: var(--faculty-forest);
          background: #fffdf8;
          font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .faculty-search:focus {
          border-color: var(--faculty-gold);
          box-shadow: 0 0 0 3px rgba(214, 168, 63, 0.13);
        }

        /* Department filters */
        .faculty-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }

        .faculty-filter {
          padding: 10px 17px;
          border: 1px solid #d9cba6;
          border-radius: 6px;
          color: var(--faculty-forest);
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .faculty-filter:hover {
          border-color: var(--faculty-gold);
          background: #f5edda;
        }

        .faculty-filter.active {
          border-color: var(--faculty-forest);
          color: #fff;
          background: var(--faculty-forest);
          box-shadow: 0 3px 10px rgba(0, 59, 43, 0.13);
        }

        /* Faculty cards */
        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .faculty-card {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e0c783;
          border-radius: 10px;
          background: #fffdf8;
          box-shadow: 0 4px 14px rgba(31, 54, 39, 0.055);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .faculty-card:hover {
          transform: translateY(-5px);
          border-color: var(--faculty-gold);
          box-shadow:
            0 8px 24px rgba(31, 54, 39, 0.10),
            0 0 0 1px rgba(214, 168, 63, 0.15);
        }

        .faculty-card-photo-wrap {
          position: relative;
          overflow: hidden;
          height: 235px;
          background: #e8e4d7;
        }

        .faculty-card-photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.4s ease;
        }

        .faculty-card:hover .faculty-card-photo {
          transform: scale(1.035);
        }

        .faculty-card-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 190px;
          padding: 19px 14px 17px;
          text-align: center;
        }

        .faculty-card-name {
          margin: 0;
          color: var(--faculty-forest);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          line-height: 1.45;
        }

        .faculty-card-designation {
          margin: 6px 0 5px;
          color: #7d6329;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.5;
        }

        .faculty-card-department {
          margin: 0 0 16px;
          color: #69736c;
          font-size: 12px;
          line-height: 1.5;
        }

        .faculty-view-button {
          width: 100%;
          max-width: 180px;
          margin-top: auto;
          padding: 10px 14px;
          border: 1px solid var(--faculty-forest);
          border-radius: 5px;
          color: #fff;
          background: var(--faculty-forest);
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .faculty-view-button:hover {
          border-color: var(--faculty-gold);
          color: var(--faculty-dark);
          background: linear-gradient(
            110deg,
            #e1b94f,
            #ffe29a,
            #d6a83f
          );
        }

        .faculty-empty {
          grid-column: 1 / -1;
          padding: 45px 20px;
          border: 1px dashed #cbb981;
          border-radius: 8px;
          color: #68736b;
          text-align: center;
        }

        /* Selected profile panel */
        .faculty-profile-panel {
          position: relative;
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 30px;
          margin-top: 35px;
          padding: 27px;
          border: 1px solid var(--faculty-gold);
          border-radius: 12px;
          color: #fff;
          background: linear-gradient(
            125deg,
            var(--faculty-forest),
            var(--faculty-dark)
          );
          box-shadow: 0 9px 25px rgba(0, 39, 27, 0.12);
          animation: facultyPanelEnter 0.35s ease both;
          scroll-margin-top: 30px;
        }

        .faculty-profile-photo-wrap {
          width: 100%;
          height: 290px;
          overflow: hidden;
          border: 2px solid var(--faculty-gold);
          border-radius: 8px;
          background: #e8e4d7;
        }

        .faculty-profile-photo {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center top;
        }

        .faculty-profile-content {
          min-width: 0;
          padding: 5px 25px 0 0;
        }

        .faculty-profile-kicker {
          margin: 0 0 9px;
          color: var(--faculty-gold-light);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .faculty-profile-name {
          margin: 0;
          color: var(--faculty-gold-light);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 3vw, 34px);
          line-height: 1.3;
        }

        .faculty-profile-role {
          margin: 6px 0 4px;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
        }

        .faculty-profile-department {
          margin: 0 0 18px;
          color: #d9e4dc;
          font-size: 13px;
        }

        .faculty-profile-divider {
          height: 1px;
          margin: 16px 0;
          background: rgba(214, 168, 63, 0.65);
        }

        .faculty-profile-biography {
          margin: 0;
          color: #e7eee9;
          font-size: 14px;
          line-height: 1.85;
        }

        .faculty-profile-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 22px;
        }

        .faculty-profile-details h4 {
          margin: 0 0 10px;
          color: var(--faculty-gold-light);
          font-size: 14px;
        }

        .faculty-profile-details ul {
          margin: 0;
          padding-left: 19px;
        }

        .faculty-profile-details li {
          margin: 6px 0;
          color: #e7eee9;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .faculty-profile-details li::marker {
          color: var(--faculty-gold-light);
        }

        .faculty-profile-details p {
          margin: 0;
          color: #e7eee9;
          font-size: 13px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .faculty-profile-close {
          position: absolute;
          top: 12px;
          right: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(246, 215, 127, 0.6);
          border-radius: 50%;
          color: var(--faculty-gold-light);
          background: transparent;
          cursor: pointer;
          font-size: 23px;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .faculty-profile-close:hover {
          color: var(--faculty-dark);
          background: var(--faculty-gold-light);
        }

        @keyframes facultyPanelEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet */
        @media (max-width: 1050px) {
          .faculty-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .faculty-card-photo-wrap {
            height: 220px;
          }

          .faculty-profile-panel {
            grid-template-columns: 220px minmax(0, 1fr);
            gap: 22px;
          }

          .faculty-profile-photo-wrap {
            height: 260px;
          }
        }

        @media (max-width: 760px) {
          .faculty-container {
            padding: 32px 4% 45px;
          }

          .faculty-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px;
          }

          .faculty-card-photo-wrap {
            height: 200px;
          }

          .faculty-card-body {
            min-height: 185px;
            padding: 16px 10px;
          }

          .faculty-card-name {
            font-size: 16px;
          }

          .faculty-profile-panel {
            grid-template-columns: 180px minmax(0, 1fr);
            gap: 18px;
            padding: 22px 18px;
          }

          .faculty-profile-photo-wrap {
            height: 225px;
          }

          .faculty-profile-content {
            padding-right: 17px;
          }

          .faculty-profile-details {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 520px) {
          .faculty-container {
            padding: 28px 16px 38px;
          }

          .faculty-search-row {
            align-items: stretch;
            flex-direction: column;
            gap: 10px;
          }

          .faculty-search {
            width: 100%;
          }

          .faculty-filters {
            gap: 8px;
          }

          .faculty-filter {
            padding: 9px 11px;
            font-size: 12px;
          }

          .faculty-grid {
            gap: 12px;
          }

          .faculty-card-photo-wrap {
            height: 155px;
          }

          .faculty-card-body {
            min-height: 190px;
            padding: 13px 9px;
          }

          .faculty-card-name {
            font-size: 15px;
          }

          .faculty-card-designation {
            font-size: 12px;
          }

          .faculty-card-department {
            font-size: 11px;
          }

          .faculty-view-button {
            padding: 9px 7px;
            font-size: 12px;
          }

          .faculty-profile-panel {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 20px;
          }

          .faculty-profile-photo-wrap {
            width: 100%;
            max-width: 260px;
            height: 250px;
          }

          .faculty-profile-content {
            padding-right: 0;
          }

          .faculty-profile-details {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .faculty-card,
          .faculty-card-photo,
          .faculty-filter,
          .faculty-view-button {
            transition: none;
          }

          .faculty-profile-panel {
            animation: none;
          }

          .faculty-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="faculty-container">
        <header className="faculty-heading">
  <div className="faculty-heading-content">
    <p className="faculty-eyebrow">
      Meet Our Academic Team
    </p>

    <h1 className="faculty-title">
      Our <span>Faculty</span>
    </h1>

    <p className="faculty-subtitle">
      Meet the educators and clinicians dedicated to
      physiotherapy education, research, and professional
      development.
    </p>
  </div>

  <div className="faculty-heading-line" />
</header>
        

        {/* Department filters */}
        <nav className="faculty-filters" aria-label="Faculty departments">
          {departments.map((department) => (
            <button
              key={department}
              type="button"
              className={
                "faculty-filter" +
                (activeDepartment === department ? " active" : "")
              }
              onClick={() => setActiveDepartment(department)}
              aria-pressed={activeDepartment === department}
            >
              {department}
            </button>
          ))}
        </nav>

        {/* Faculty cards */}
        <section className="faculty-grid" aria-label="Faculty directory">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty) => (
              <article className="faculty-card" key={faculty.id}>
                <div className="faculty-card-photo-wrap">
                  <img
                    className="faculty-card-photo"
                    src={faculty.image}
                    alt={faculty.name}
                    loading="lazy"
                  />
                </div>

                <div className="faculty-card-body">
                  <h2 className="faculty-card-name">
                    {faculty.name}
                  </h2>

                  <p className="faculty-card-designation">
                    {faculty.designation}
                  </p>

                  <p className="faculty-card-department">
                    Department of {faculty.department} Physiotherapy
                  </p>

                  <button
                    className="faculty-view-button"
                    type="button"
                    onClick={() => openProfile(faculty)}
                  >
                    View Profile <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="faculty-empty">
              No faculty members found. Try another name or department.
            </div>
          )}
        </section>

        {/* Selected faculty details */}
        {selectedFaculty && (
          <section
            className="faculty-profile-panel"
            aria-label={`Profile of ${selectedFaculty.name}`}
            aria-live="polite"
          >
            <button
              type="button"
              className="faculty-profile-close"
              onClick={() => setSelectedFaculty(null)}
              aria-label="Close faculty profile"
            >
              ×
            </button>

            <div className="faculty-profile-photo-wrap">
              <img
                className="faculty-profile-photo"
                src={selectedFaculty.image}
                alt={selectedFaculty.name}
              />
            </div>

            <div className="faculty-profile-content">
              <p className="faculty-profile-kicker">
                Faculty Profile
              </p>

              <h2 className="faculty-profile-name">
                {selectedFaculty.name}
              </h2>

              <p className="faculty-profile-role">
                {selectedFaculty.designation}
              </p>

              <p className="faculty-profile-department">
                Department of {selectedFaculty.department} Physiotherapy
              </p>

              <div className="faculty-profile-divider" />

              <p className="faculty-profile-biography">
                {selectedFaculty.biography}
              </p>

              <div className="faculty-profile-details">
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {selectedFaculty.qualifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Professional Experience</h4>
                  <p>{selectedFaculty.experience}</p>
                </div>

                <div>
                  <h4>Specialization</h4>
                  <ul>
                    {selectedFaculty.specialization.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Research Interests</h4>
                  <p>{selectedFaculty.research}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
