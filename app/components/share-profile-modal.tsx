// This component is a modal for sharing a user's profile link. It fetches the link from an API, allows the user to copy it, and share.
// The modal also handles errors and provides feedback when the link is copied.
import { useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import Button from "~/components/ui/button";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { get } from "~/libs/axios";
import { QRCode } from "react-qrcode-logo";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { LuX, LuMail, LuDownload, LuQrCode, LuCopy, LuCheck } from "react-icons/lu";
import { FaXTwitter, FaSquareWhatsapp, FaLinkedin, FaFacebookF, FaTelegram } from "react-icons/fa6";
import useAuth from "~/stores/authStore";

type ShareProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ShareProfileModal: React.FC<ShareProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [profileLink, setProfileLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isNativeSharing, setIsNativeSharing] = useState(!!navigator.share);
  const [showQrCode, setShowQrCode] = useState(false); // New state for QR code visibility
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      return;
    }

    const fetchProfileLink = async () => {
      try {
        // const response = await get<{ link: string }>("/api/profile-link");
        const link = `${location.origin}/${user?.username}`;
        setProfileLink(link);
        if (isNativeSharing) {
          try {
            await navigator.share({
              title: "Check out my profile",
              text: "Here’s my professional profile!",
              url: link,
            });
            onClose();
          } catch (err) {
            setError("Sharing failed. Please try another method.");
            setIsNativeSharing(false);
          }
        }
      } catch (error) {
        console.error("Error fetching profile link:", error);
        setError("Failed to fetch profile link. Please try again.");
        setIsNativeSharing(false);
      }
    };

    fetchProfileLink();
  }, [isOpen, onClose, isNativeSharing]);

  const handleCopy = () => {
    if (!profileLink) return;
    navigator.clipboard
      .writeText(profileLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => setError("Copy failed: " + err.message));
  };

  const encodedLink = encodeURIComponent(profileLink);
  const emailURL = `mailto:?subject=Check out my profile&body=${encodedLink}`;
  const twitterURL = `https://x.com/intent/tweet?url=${encodedLink}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
  const telegramURL = `https://t.me/share/url?url=${encodedLink}&text=Check out my profile!`;
  const whatsappURL = `https://wa.me/?text=${encodedLink}`;
  const linkedinURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;

  const handleDownload = () => {
    const canvas = document.getElementById("profile-qr-code") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${user?.username}-profile-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Transition show={isOpen} as={motion.div}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <Transition.Child
          as={motion.div}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={motion.div}
            enter="ease-out duration-300"
            enterFrom={isMobile ? "opacity-0 translate-y-full" : "opacity-0 scale-95"}
            enterTo={isMobile ? "opacity-100 translate-y-0" : "opacity-100 scale-100"}
            leave="ease-in duration-200"
            leaveFrom={isMobile ? "opacity-100 translate-y-0" : "opacity-100 scale-100"}
            leaveTo={isMobile ? "opacity-0 translate-y-full" : "opacity-0 scale-95"}
          >
            <DialogPanel className={`relative max-w-md w-full bg-white dark:bg-neutral-800 p-6 shadow-lg z-50 ${isMobile ? 'fixed bottom-0 rounded-t-2xl' : 'rounded-2xl'}`}>
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-neutral-200">
                  Share Your Profile
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  aria-label="Close modal"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

              <div className="mb-4">
                <div className="flex items-center border dark:border-neutral-600 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    readOnly
                    value={profileLink}
                    aria-label="Profile link"
                    className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300 border-none focus:outline-none"
                  />
                  <button
                    onClick={() => setShowQrCode(!showQrCode)}
                    className="px-3 py-2 text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-600"
                    title={showQrCode ? "Hide QR Code" : "Show QR Code"}
                  >
                    <LuQrCode size={18} />
                  </button>
                  <button
                    data-tooltip-id="copy-tooltip"
                    onClick={handleCopy}
                    className="relative px-3 py-2 text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-600"
                    title="Copy link"
                    disabled={!profileLink}
                  >
                    <LuCopy size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                  Your profile link is private until shared. Don’t share it unless
                  you’re sure!
                </p>
              </div>
              <Tooltip
                id="copy-tooltip"
                content="Copied!"
                isOpen={copied}
                place="top"
                variant="success"
                offset={10}
              />
          <Tooltip
            id="download-tooltip"
            place="top"
            variant="dark"
            offset={10}
          />

              <AnimatePresence>
                {showQrCode && profileLink && (
                  <motion.div
                    className="relative group flex justify-center p-4 bg-white rounded-lg shadow-inner mb-4 overflow-hidden"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="relative">
                      <QRCode
                        id="profile-qr-code"
                        value={profileLink}
                        size={256}
                        logoImage="/icon.png"
                        logoWidth={40}
                        logoHeight={40}
                        logoOpacity={0.8}
                        qrStyle="dots"
                        logoPaddingRadius={5}
                        logoPaddingStyle="circle"
                        removeQrCodeBehindLogo
                        fgColor="#0B4C8D"
                        bgColor="#FFFFFF"
                        eyeColor="#0B4C8D"
                      />
                  <button
                    onClick={handleDownload}
                    className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    data-tooltip-id="download-tooltip"
                    data-tooltip-content="Download QR Code"
                  >
                        <LuDownload size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isNativeSharing && (
                <>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 text-center mb-4">Share To</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    <a
                      href={emailURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-sm text-gray-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-colors group text-center"
                    >
                      <motion.div whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <LuMail className="mb-1 w-6 h-6 text-gray-600 dark:text-neutral-400 group-hover:text-red-500" />
                      </motion.div>
                      Email
                    </a>
                    <a
                      href={twitterURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-sm text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors group text-center"
                    >
                      <motion.div whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <FaXTwitter className="mb-1 w-6 h-6 text-gray-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white" />
                      </motion.div>
                      X
                    </a>
                    <a
                      href={facebookURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-sm text-gray-700 dark:text-neutral-300 hover:text-blue-700 dark:hover:text-blue-500 transition-colors group text-center"
                    >
                      <motion.div whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <FaFacebookF className="mb-1 w-6 h-6 text-gray-600 dark:text-neutral-400 group-hover:text-blue-700" />
                      </motion.div>
                      Facebook
                    </a>
                    <a
                      href={telegramURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-sm text-gray-700 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors group text-center"
                    >
                      <motion.div whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <FaTelegram className="mb-1 w-6 h-6 text-gray-600 dark:text-neutral-400 group-hover:text-blue-500" />
                      </motion.div>
                      Telegram
                    </a>
                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-sm text-gray-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group text-center"
                    >
                      <motion.div whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <FaSquareWhatsapp className="mb-1 w-6 h-6 text-gray-600 dark:text-neutral-400 group-hover:text-green-500" />
                      </motion.div>
                      WhatsApp
                    </a>
                    <a
                      href={linkedinURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-sm text-gray-700 dark:text-neutral-300 hover:text-blue-700 dark:hover:text-blue-500 transition-colors group text-center"
                    >
                      <motion.div whileHover={{ y: -4, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <FaLinkedin className="mb-1 w-6 h-6 text-gray-600 dark:text-neutral-400 group-hover:text-blue-700" />
                      </motion.div>
                      LinkedIn
                    </a>
                  </div>
                </>
              )}
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareProfileModal;
