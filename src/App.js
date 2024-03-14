import { useEffect, useState } from "react";
import { FriendsList } from "./components/FriendsList";
import { FormAddFriend } from "./components/FormAddFriend";
import { FormSplitBill } from "./components/FormSplitBill";
import { Button } from "./components/Button";
import { initialFriends } from "./data/initialFriendsData";

export default function App() {
  const [friends, setFriends] = useState(() => {
    const friendsData = JSON.parse(localStorage.getItem("friends"));
    if (friendsData) return friendsData;
    return initialFriends;
  });
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleDeleteFriend(id) {
    setFriends((friends) => {
      return friends.filter((friend) => friend.id !== id);
    });
    setSelectedFriend(null);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          onDeleteFriend={handleDeleteFriend}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
