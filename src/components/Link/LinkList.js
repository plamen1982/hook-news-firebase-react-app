import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';

function LinkList(props) {
  const { firebase: { db } } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes('new');

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    db.collection('links')
    .orderBy('created', 'desc')
    .get()
    .then(snapshotLinks => handleSnapshotLinks(snapshotLinks));
  }

  function handleSnapshotLinks(snapshotLinks) {
    const links = snapshotLinks.docs.map(link => {
      return { id: link.id, ...link.data() }
    });
    setLinks(links);
  }

  function renderLinks() {
    if(isNewPage) {
      return links;
    }
   const topLinks = [...links].sort((link1, link2) => link2.votes.length - link1.votes.length);
   return topLinks
  }

  return (
    <div>
      {renderLinks().map((link, index) => (
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
