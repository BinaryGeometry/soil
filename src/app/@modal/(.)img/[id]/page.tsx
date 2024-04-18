import { Modal } from "~/components/modal";
import FullPageImageView from "~/components/full-page-image";

export default async function ImgModal( {
    params: { id: photoId },
}: {
    params: { id: string };
}) {

    const idAsNumber = Number(photoId);
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

    return (
        <Modal>
            <FullPageImageView id={idAsNumber} />
        </Modal>
    );
}

