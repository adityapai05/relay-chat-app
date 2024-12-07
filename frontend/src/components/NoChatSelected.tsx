import Logo from "./Logo";

const NoChatSelected = () => {
  return (
    <div className="w-full">
      <div className="h-full w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
        <div className="max-w-md text-center space-y-3">
          {/* Icon Display */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="size-20 rounded-2xl flex items-center
             justify-center"
              >
                <Logo />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold">Welcome to Relay Chat!</h2>
          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
