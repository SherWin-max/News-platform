import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ProfileHeader, ProfileUpdate, NewsFeed } from "../components";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  const [userInfo, setUserInfo] = useState(null);

  const [userNews, setUserNews] = useState(null);

  const [isDeleted, setIsDeleted] = useState(false);

  const updateProfileUrl = "/api/update-profile";
  const getUserByIdUrl = "/api/get-user";
  const getNewsByUserIdUrl = "/api/get-news";

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`${getUserByIdUrl}?user_id=${user.sub}`);
      const data = await res.json();

      setUserInfo(data.data);
      setLoading(false);
    };

    const getNewsByUserId = async () => {
      const res = await fetch(`${getNewsByUserIdUrl}?user_id=${user.sub}`);
      const data = await res.json();

      setUserNews(data.data);
      setNewsLoading(false);
    };
    getUserInfo();
    getNewsByUserId();
  }, [user.sub, isDeleted]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const updateProfile = (formData) => {
    fetch(`${updateProfileUrl}?user_id=${user.sub}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo((prev) => ({ ...prev, ...formData }));
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    updateProfile(formData);
  };
  return (
    isAuthenticated &&
    !loading && (
      <>
        <ProfileHeader
          picture={user.picture}
          givenName={userInfo?.given_name}
          familyName={userInfo?.family_name}
          username={userInfo?.username}
          address={userInfo?.address}
        >
          <ProfileUpdate handleSubmit={handleSubmit} defaultValue={userInfo} />
          {!newsLoading &&
            userNews.map((article) => {
              return (
                <NewsFeed
                  key={article._id}
                  id={article._id}
                  picture={user.picture}
                  givenName={userInfo?.given_name}
                  familyName={userInfo?.family_name}
                  username={userInfo?.username}
                  title={article.title}
                  description={article.description}
                  likes={article.likes}
                  isShort={true}
                  isRemovable={article.author ? false : true}
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                />
              );
            })}
        </ProfileHeader>
      </>
    )
  );
};
export default Profile;
