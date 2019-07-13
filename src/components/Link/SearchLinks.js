import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';

function SearchLinks() {

  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState([]);
  const [filteredLinks, setfilteredLinks] = useState([]);

  const { firebase: { db } } = useContext(FirebaseContext);

  function handleSearch(event) {
    event.preventDefault();

    const query = filter.toLowerCase();
    const matchedLinks = links.filter(link => {

      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      ); 
    });

    setfilteredLinks(matchedLinks);
  }

 /**
  * @description when component is mount call getLinks() and set it to local state variable links
  */
  useEffect(() => {
    getLinks();

  }, []);

  /**
   * @description fetch all links from the firebase
   * @returns Array
   */
  function getLinks() {
      
      db.collection('links')
      .get()
      .then(snapshotLinks => {
        const links = snapshotLinks.docs.map(link => {

          return { id: link.id, ...link.data() }
        });

        return setLinks(links);
    });
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <input 
            onChange={(event) => setFilter(event.target.value)} 
            placeholder="Search link"
          />
          <button>ok</button>
        </div>
      </form>
      <div>{filteredLinks.map((filteredLink, index) => ( 
        <LinkItem 
          key={filteredLink.id}
          index={index} 
          link={filteredLink} 
          showCount={false} /> 
          ))}
      </div>
    </div>

  );
}

export default SearchLinks;
