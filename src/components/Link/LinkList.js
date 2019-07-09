import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';

function LinkList(props) {
  const { firebase: { db } } = useContext(FirebaseContext);
  const [links, setLinks] = useState([])
  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    db.collection('links').onSnapshot(handleSnapshotLinks);
  }

  function handleSnapshotLinks(snapshotLinks) {
    const links = snapshotLinks.docs.map(link => {
      return { id: link.id, ...link.data() }
    });
    setLinks(links);
  }

  return (
    <div>
      {links.map((link, index) => <LinkItem key={link.id} showCount={true} link={link} index={index + 1} />)}
    </div>
  );
}

export default LinkList;
