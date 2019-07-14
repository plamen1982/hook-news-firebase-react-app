import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';

function LinkList(props) {
  const { firebase: { db } } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');

  useEffect(() => {
   const unsubscribe = getLinks();
   return () => unsubscribe();
  }, [isNewPage, isTopPage]);

  function getLinks() {
    if(isTopPage) {
      return db.collection('links')
      .orderBy('voteCount', 'desc')
      .onSnapshot(handleSnapshotLinks);
    } 
    return db.collection('links')
    .orderBy('created', 'desc')
    .onSnapshot(handleSnapshotLinks);
  }

  function handleSnapshotLinks(snapshotLinks) {
    const links = snapshotLinks.docs.map(link => {
      return { id: link.id, ...link.data() }
    });
    setLinks(links);
  }

  // function renderLinks() {
  //   if(isNewPage) {
  //     return links;
  //   }
  //  const topLinks = [...links].sort((link1, link2) => link2.votes.length - link1.votes.length);
  //  return topLinks
  // }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem 
          key={link.id} 
          showCount={true} 
          link={link} 
          index={index + 1} 
        />
      ))}
    </div>
  );
}

export default LinkList;
