const MessageSkeleton = () => {
  // Create an array of 8 items for skeleton messages
  const skeletonMessages = Array(8).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full bg-gradient-to-br from-base-300 to-base-300/50" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-3 w-20 bg-gradient-to-r from-base-300 to-base-300/50" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="space-y-2">
              <div className="skeleton h-4 w-32 bg-gradient-to-r from-base-300 to-base-300/50" />
              <div className="skeleton h-4 w-24 bg-gradient-to-r from-base-300 to-base-300/50" />
              <div className="skeleton h-4 w-28 bg-gradient-to-r from-base-300 to-base-300/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
