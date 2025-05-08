import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   p: 4,
//   boxShadow: "none",
//   border: "none",
//   outline: "none",
// };

interface SuccessModalProps {
  open: boolean;
  handleClose: () => void;
  // clearForm: () => void;
}

export default function ModalComponent({
  open, 
  handleClose,
  // clearForm
}: SuccessModalProps) {

  const handleOnClose = () => {
    handleClose();
    // clearForm();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white px-8 pb-8 shadow-none border-none outline-none text-center rounded-xl">
          <div className="text-end pb-8 pt-5" onClick={handleOnClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline-block cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            Berhasil Menambahkan Jadwal Baru
          </h2>

          <div className="flex justify-center my-5">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                />
              </motion.svg>
            </motion.div>
          </div>

          <p
            id="modal-modal-description"
            className="text-md text-gray-500 mt-2 mb-9 "
          >
            Jadwal baru pada dokter dengan id sukses ditambahkan
          </p>
          <Button
            variant="contained"
            className=""
            onClick={handleOnClose}
          >
            confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
