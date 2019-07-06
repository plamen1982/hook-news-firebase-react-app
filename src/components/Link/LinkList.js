import React, { useContext, useEffect } from "react";
import FirebaseContext from '../../firebase/context';
function LinkList(props) {
  const { firebase: { db } } = useContext(FirebaseContext);

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    db.collection('links').onSnapshot(handleSnapshotLinks);
  }

  function handleSnapshotLinks(snapshotLinks) {
    debugger;
    const links = snapshotLinks.docs.map(link => {
      return { id: link.id, ...link.data() }
    });
    console.log({ links });
  }
  return (
    <div>LInks</div>
  );
}

export default LinkList;
