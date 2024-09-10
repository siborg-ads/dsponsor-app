import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  cn
} from "@nextui-org/react";

const ConditionModal = ({ title, body, onConfirm, onCancel, isVisible, setIsVisible }) => {
  const [checked, setChecked] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    if (checked) {
      setIsVisible(false);
      onConfirm && onConfirm();
    } else {
      alert("Veuillez cocher la case pour continuer.");
    }
  };

  return (
    <>
      <Modal closeButton aria-labelledby="modal-title" isOpen={isVisible} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {body}
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="primary"
            >
              J'ai bien compris
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={closeModal}>
              Annuler
            </Button>
            <Button
              onPress={handleConfirm}
              disabled={!checked}
              className={cn(
                !checked
                  ? "bg-primaryPurple data-[hover=true]:opacity-65 opacity-65 cursor-not-allowed"
                  : "bg-primaryPurple text-white"
              )}
            >
              Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConditionModal;
