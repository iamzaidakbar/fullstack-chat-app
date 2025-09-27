import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100/50 to-base-200/30">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center
             justify-center animate-bounce-gentle shadow-glow"
            >
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-accent-content" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to ZA Chat!
          </h2>
          <p className="text-base-content/60 text-lg">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 rounded-lg bg-base-100/50 border border-base-300 card-hover animate-fade-in">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-sm font-medium">Real-time Chat</p>
          </div>
          <div
            className="p-4 rounded-lg bg-base-100/50 border border-base-300 card-hover animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm font-medium">Secure & Private</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-base-300">
          <p className="text-xs text-base-content/50">
            Built with ❤️ by{" "}
            <span className="font-semibold text-primary">Zaid Akbar</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
