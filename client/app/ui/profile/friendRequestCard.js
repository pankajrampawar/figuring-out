'use client'
import { acceptFriendRequest, getUser, rejectFriendRequest, sendFriendRequest } from "@/app/actions";
import { happyMonkey } from "@/app/fonts";
import { useEffect, useState } from "react";

export default function FriendRequestCard(props) {

    console.log(props.friendsRequest)

    const [friendRequests, setFriendRequests] = useState('');
    const [friendArray, setFriendArray] = useState([]);

    useEffect(() => {
        setFriendRequests(props.friendsRequest);
    }, []);

    console.log(friendRequests)

    useEffect(() => {
        const getFriendsById = async () => {
            if (!friendRequests) {
                return;
            }

            const updatedFriendArray = await Promise.all(
                friendRequests.map(async (friendId) => {
                    try {
                        const friend = await getUser(friendId);
                        return friend;
                    } catch (error) {
                        console.error("Error fetching friend:", error);
                        return null; // or handle the error in some other way
                    }
                })
            );

            setFriendArray(updatedFriendArray.filter(Boolean)); // Filter out any null values
        };

        getFriendsById();
    }, [friendRequests]);

    const acceptFriendRequestAction = async (friendId) => {
        const response = await acceptFriendRequest(friendId)
        if (!response) {
            alert("error please try again later!");
            return;
        }

        alert('You are now friends!');
        props.toggleTrigger();
        window.location.reaload();
        return;
    };

    const rejectFriendRequestAction = async (friendId) => {
        const response = await rejectFriendRequest(friendId)
        if (!response) {
            alert('error please try again later!');
            return;
        }

        alert('rejected');
        window.location.reaload();
        return;
    };

    console.log(friendArray)

    return (
        <div className="text-white">
            {friendArray.map((friend) => (
                <div key={friend._id} className="flex flex-col border-b border-gray-600 py-2 px-4">
                    <div>
                        {friend.userName} sent a friend request
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <button onClick={() => acceptFriendRequestAction(friend._id)} className={`bg-primary text-black hover:border-white border border-primary font-bold py-1 px-2 rounded-xl mr-2 ${happyMonkey.className}`}>
                                Accept
                            </button>
                        </div>
                        <div>
                            <button onClick={() => rejectFriendRequestAction(friend._id)} className={`bg-white text-black hover:border-primary border font-bold py-1 px-2 rounded-xl mr-2 ${happyMonkey.className}`}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
