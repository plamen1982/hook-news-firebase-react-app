import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';
import { LINKS_PER_PAGE } from '../../utils';
import axios from 'axios';

function LinkList(props) {
  const { firebase: { db } } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = Number(props.match.params.page);
  const linksRef = db.collection('links');

  useEffect(() => {
   const unsubscribe = getLinks();
   return () => unsubscribe();
  }, [isNewPage, isTopPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);
    setLoading(true);
    if(isTopPage) {
      return linksRef
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE )
        .onSnapshot(handleSnapshotLinks);
    } else if(page === 1) {
        return linksRef
          .orderBy('created', 'desc')
          .limit(LINKS_PER_PAGE )
          .onSnapshot(handleSnapshotLinks);
    } else if(hasCursor) {
        return linksRef
          .orderBy('created', 'desc')
          .startAfter(cursor.created)
          .limit(LINKS_PER_PAGE )
          .onSnapshot(handleSnapshotLinks);
    } else {
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios.get(`https://us-central1-hooks-news-application.cloudfunctions.net/linksPagination?offset=${offset}`)
      .then(respose => {
        const links = respose.data;
        const lastLink = links[links.length - 1];
        setLinks(links);
        setCursor(lastLink);
        setLoading(false);
      })
     //unsubscribe() expect a function, so we just return function that return empty object 
      return () => {}
    }
  }

  function handleSnapshotLinks(snapshotLinks) {
    const links = snapshotLinks.docs.map(link => {
      return { id: link.id, ...link.data() }
    });
    setLinks(links);
    const lastLink = links[links.length - 1];
    setCursor(lastLink);
    setLoading(false);
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
  
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 1;
  return (
    <div style={{ opacity: loading ? 0.25 : 1}}>
      {links.map((link, index) => (
        <LinkItem 
          key={link.id} 
          showCount={true} 
          link={link} 
          index={pageIndex + index} 
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
