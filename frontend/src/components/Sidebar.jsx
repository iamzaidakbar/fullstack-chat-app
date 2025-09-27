import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100/50">
      <div className="border-b border-base-300 w-full p-5 bg-gradient-to-r from-base-100 to-base-100/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold hidden lg:block gradient-text">
            Contacts
          </span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 hover:bg-base-200 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-medium">Show online only</span>
          </label>
          <span className="text-xs text-base-content/60 bg-base-200 px-2 py-1 rounded-full">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 custom-scrollbar">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-200/80 transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 ring-2 ring-primary/20"
                  : ""
              }
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
            aria-label={`Select conversation with ${user.fullName}`}
            aria-pressed={selectedUser?._id === user._id}
            role="button"
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={`${user.fullName}'s profile picture`}
                className="size-12 object-cover rounded-full border-2 border-base-300 hover:border-primary/50 transition-colors"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-base-100 animate-pulse"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-base-content">
                {user.fullName}
              </div>
              <div className="text-sm text-base-content/60 flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    onlineUsers.includes(user._id)
                      ? "bg-green-500"
                      : "bg-base-300"
                  }`}
                />
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/60 py-8">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-sm font-medium">No contacts found</p>
            <p className="text-xs text-base-content/40 mt-1">
              {showOnlineOnly
                ? "Try turning off the online filter"
                : "Add some friends to start chatting!"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
