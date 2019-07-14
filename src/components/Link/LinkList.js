import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';
import { LINKS_PER_PAGE } from '../../utils';

function LinkList(props) {
  const { firebase: { db } } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = Number(props.match.params.page);

  useEffect(() => {
   const unsubscribe = getLinks();
   return () => unsubscribe();
  }, [isNewPage, isTopPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);
    if(isTopPage) {
      return db.collection('links')
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE )
        .onSnapshot(handleSnapshotLinks);
    } else if(page === 1) {
        return db.collection('links')
          .orderBy('created', 'desc')
          .limit(LINKS_PER_PAGE )
          .onSnapshot(handleSnapshotLinks);
    } else if(hasCursor) {
        return db.collection('links')
          .orderBy('created', 'desc')
          .startAfter(cursor.created)
          .limit(LINKS_PER_PAGE )
          .onSnapshot(handleSnapshotLinks);
    }
  }

  function handleSnapshotLinks(snapshotLinks) {
    const links = snapshotLinks.docs.map(link => {
      return { id: link.id, ...link.data() }
    });
    setLinks(links);
    const lastLink = links[links.length - 1];
    setCursor(lastLink);
  }

  function visitPreviousPage() {
    if(page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if(page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
  }

  // function renderLinks() {
  //   if(isNewPage) {
  //     return links;
  //   }
  //  const topLinks = [...links].sort((link1, link2) => link2.votes.length - link1.votes.length);
  //  return topLinks
  // }
  
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;
  return (
    <div>
      {links.map((link, index) => (
        <LinkItem 
          key={link.id} 
          showCount={true} 
          link={link} 
          index={pageIndex + index + 1} 
        />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
          <div className="pointer" onClick={visitNextPage}>Next</div>
        </div>
      )}
    </div>
  );
}

export default LinkList;
