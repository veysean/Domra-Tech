import { useState } from "react";


export default function WordDetailCard({ word, onRequest, isFav, toggleFav }) {
  const [showReference, setShowReference] = useState(false);
  return (
    <div className="w-[400px] md:w-[500px] lg:w-[565px] p-7 bg-white border-t-4 border-indigo-500 rounded-[30px] shadow-md overflow-y-auto scrollbar-hide flex flex-col gap-7">
      {/* Header: Word details */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <p className="text-[#2D3748] text-xl md:text-2xl lg:text-3xl font-medium font-inter">{word?.EnglishWord}</p>
          <p className="text-[#667EEA] text-xl md:text-2xl lg:text-3xl font-normal font-inter">{word?.KhmerWord}</p>
          <p className="text-[#667EEA] text-xl md:text-2xl lg:text-3xl font-normal font-inter">{word?.FrenchWord}</p>
        </div>
        {/* Favorite icon */}
        <div className="relative w-6 h-6 cursor-pointer hover:bg-[#E9ECEF] rounded flex items-center justify-center" onClick={toggleFav}>
          {isFav ? (
            <div className="w-4 h-3.5 absolute">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 1.314C12.4384 -3.24799 23.5343 4.7355 8 15C-7.53427 4.7355 3.56164 -3.24799 8 1.314Z" fill="#DC3545"/>
                </svg>
            </div>
          ) : (
            <div className="w-4 h-3.5 absolute">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2.74805L7.28325 2.01133C5.5989 0.280067 2.51415 0.877695 1.40036 3.05284C0.876534 4.07583 0.75875 5.55246 1.71429 7.43758C2.63457 9.25313 4.54767 11.4265 8 13.7946C11.4523 11.4265 13.3654 9.25313 14.2857 7.43758C15.2413 5.55246 15.1235 4.07583 14.5996 3.05284C13.4859 0.877695 10.4011 0.280067 8.71675 2.01133L8 2.74805ZM8 15C-7.33313 4.86841 3.27876 -3.04087 7.82432 1.14308C7.88395 1.19797 7.94253 1.25493 8 1.314C8.05747 1.25494 8.11605 1.19797 8.17567 1.14309C12.7212 -3.04088 23.3331 4.8684 8 15Z" fill="#667EEA"/>
                </svg>
            </div>
          )}
        </div>
      </div>

      {/* Definition */}
      <Section title="Definition">
        <p className="text-[#667EEA] text-xs md:text-sm lg:text-base">{word?.definition}</p>
      </Section>

      {/* Example */}
      <Section title="Example">
        <p className="text-[#667EEA] text-xs md:text-sm lg:text-base">{word?.example || "No Example"}</p>
      </Section>

      {/* Reference (collapsible) */}
      <div onClick={() => setShowReference(!showReference)} className="cursor-pointer">
        {!showReference ? (
          <CollapsedReference />
        ) : (
          <ExpandedReference reference={word?.reference} />
        )}
      </div>

      {/*detail card Footer */}
      <div className="pt-7 border-t border-slate-200 flex justify-between items-center">
        <p className="text-slate-500 text-xs lg:text-base font-medium">
          Added: {word?.createdAt?.slice(0, 10) || "N/A"}
        </p>

        <button onClick={onRequest} className="h-10 px-2 lg:px-4 bg-[#FFC107] rounded-[20px] flex items-center gap-2 text-white text-xs lg:text-base font-medium hover:brightness-105">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.999763 3.5C0.999763 2.67157 1.67134 2 2.49976 2H5.2637C6.22146 2 7.02449 2.55996 7.57518 3.18398C7.98501 3.64839 8.47847 4 8.99976 4H13.5005C14.3293 4 14.9998 4.67203 14.9998 5.5V6.13933C15.5693 6.40467 15.9391 7.0161 15.8554 7.68605L15.2149 12.8101C15.0585 14.0612 13.995 15 12.7342 15H3.26533C2.00452 15 0.941017 14.0612 0.784633 12.8101L0.144128 7.68605C0.0603842 7.0161 0.430217 6.40467 0.999763 6.13933V3.5ZM1.99976 6H13.9998V5.5C13.9998 5.22341 13.7761 5 13.5005 5H8.99976C8.03587 5 7.28923 4.37127 6.82539 3.84565C6.37357 3.33367 5.82102 3 5.2637 3H2.49976C2.22362 3 1.99976 3.22386 1.99976 3.5V6ZM1.63254 7C1.3318 7 1.0991 7.26359 1.13641 7.56202L1.77691 12.6861C1.87074 13.4367 2.50884 14 3.26533 14H12.7342C13.4907 14 14.1288 13.4367 14.2226 12.6861L14.8631 7.56202C14.9004 7.26359 14.6677 7 14.367 7H1.63254Z"
              fill="white"
            />
          </svg>
          Request
        </button>
      </div>
    </div>
  );
}

/* --- Subcomponents --- */
function Section({ title, children }) {
  return (
    <div className="p-3 lg:p-5 bg-[#E9ECEF] rounded-[20px] border-l-4 border-indigo-500 flex flex-col gap-3">
      <p className="text-[#4A5568] text-xs font-medium md:text-sm lg:text-base">{title}</p>
      {children}
    </div>
  );
}

function CollapsedReference() {
  return (
    <div className="h-10 p-5 bg-gray-50 rounded-[20px] border-l-4 border-indigo-500 flex items-center justify-between">
      <p className="text-[#4A5568] text-xs md:text-sm lg:text-base font-medium">Reference</p>
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1C3.73367 4.12419 5.26633 5.87581 8 9L1 17"
          stroke="#4A5568"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

//function to handle reference 
export const renderReference = ({reference}) => {
  const ref = reference?.trim();
  if (ref.startsWith("https")) {
      return ref;
    }

    const parts = reference.split("https");
    if (parts.length > 1) {
      const text = parts[0].trim();
      const link = "https" + parts[1].trim();
      return link;
    }
};

function ExpandedReference({ reference }) {

  return (
    <div className="min-h-20 lg:min-h-36 p-5 bg-[#E9ECEF] rounded-[20px] border-l-4 border-indigo-500 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-xs md:text-sm lg:text-base font-medium">Reference</p>
        <svg
          width="21"
          height="11"
          viewBox="0 0 21 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5C4.02687 4.29641 7.14268 6.70359 10.1695 9.5L20.0002 2"
            stroke="#718096"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <a href={renderReference({ reference: reference })} target="_blank" rel="noopener noreferrer" className=" text-xs lg:text-sm underline text-[#667EEA] break-words">
        {renderReference({ reference: reference })}
      </a>
    </div>
  );
}
