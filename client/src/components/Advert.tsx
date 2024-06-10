import { AdvertT } from "../types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const DESCRIPTION_LENGTH = 50;

interface AdvertProps {
  advert: AdvertT;
  handleDeleteAdvert: (id: number) => void;
  onEditAdvertClick: (id: number) => void;
  showButtons: boolean;
}

function Advert({
  advert,
  handleDeleteAdvert,
  onEditAdvertClick,
  showButtons,
}: AdvertProps) {
  const prepareDescription = (text: string) => {
    if (text.length > DESCRIPTION_LENGTH) {
      return text.slice(0, DESCRIPTION_LENGTH) + "...";
    }
    return text;
  };

  return (
    <div className="card card-compact bg-base-300">
      <div className="card-body">
        <h2 className="card-title">{advert.title}</h2>
        <p>{prepareDescription(advert.description)}</p>
        <div className="text-white space-x-2">
          <span>$</span>
          <span>{advert.price}</span>
        </div>
        <div className="card-actions justify-evenly min-h-8">
          {showButtons && (
            <>
              <div className="tooltip" data-tip="Edit">
                <button
                  className="btn btn-sm"
                  onClick={() => onEditAdvertClick(advert.id)}
                >
                  <FontAwesomeIcon icon={faPen} className="text-blue-500" />
                </button>
              </div>
              <div className="tooltip" data-tip="Delete">
                <button
                  className="btn btn-sm"
                  onClick={() => handleDeleteAdvert(advert.id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Advert;
