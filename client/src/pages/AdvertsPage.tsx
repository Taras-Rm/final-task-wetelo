import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useAppDispatch, useAppSelector } from "../state";
import { deleteAdvert, getAdverts, setEditAdvertId } from "../state/adverts";
import Advert from "../components/Advert";
import { toast } from "react-toastify";
import useModal from "../hooks/useModel";
import Modal from "../components/Modal";
import CreateAdvertForm from "../components/forms/adverts/CreateAdvertForm";
import EditAdvertForm from "../components/forms/adverts/EditAdvertForm";

function AdvertsPage() {
  const dispatch = useAppDispatch();
  const { adverts } = useAppSelector((state) => state.adverts);
  const { user } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const {
    open: openCreate,
    close: closeCreate,
    name: nameCreate,
  } = useModal("create_advert");

  const {
    open: openEdit,
    close: closeEdit,
    name: nameEdit,
  } = useModal("edit_advert");

  useEffect(() => {
    setIsLoading(true);

    dispatch(getAdverts())
      .unwrap()
      .then(() => setIsLoading(false));
  }, []);

  const handleDeleteAdvert = async (id: number) => {
    try {
      await dispatch(deleteAdvert(id)).unwrap();

      toast.success("Advert deleted");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const onEditAdvertClick = async (id: number) => {
    dispatch(setEditAdvertId(id));
    openEdit();
  };

  if (isLoading) {
    return <span className="loading loading-lg mt-8"></span>;
  }

  return (
    <PageWrapper
      title="Adverts"
      buttons={
        <button
          disabled={!user?.isVerified}
          className="btn btn-sm btn-primary"
          onClick={openCreate}
        >
          Create advert
        </button>
      }
    >
      <div className="grid grid-cols-4 gap-4">
        {adverts.map((advert) => (
          <Advert
            advert={advert}
            handleDeleteAdvert={handleDeleteAdvert}
            onEditAdvertClick={onEditAdvertClick}
            showButtons={user?.role === "admin" || user?.id === advert.userId}
            key={advert.id}
          />
        ))}
      </div>
      <Modal
        name={nameCreate}
        body={<CreateAdvertForm handleSave={() => closeCreate()} />}
      />
      <Modal
        name={nameEdit}
        body={<EditAdvertForm handleSave={() => closeEdit()} />}
      />
    </PageWrapper>
  );
}

export default AdvertsPage;
