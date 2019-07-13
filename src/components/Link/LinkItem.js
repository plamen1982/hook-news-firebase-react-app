import React, { useContext } from "react";
import { Link, withRouter } from 'react-router-dom';
import { getDomain } from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import FirebaseContext from '../../firebase/context'; 

function LinkItem({ link, index, showCount, history }) {

  const { user, firebase: { db } } = useContext(FirebaseContext);  

  function handleVote() {
    if(!user) {
      history.push('/login');
    } else {
      const voteRef = db.collection('links').doc(link.id);
      voteRef.get().then(doc => {
        if(doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        } 
      });
    }
  }

  function handleDelete() {
    const refLink = db.collection('links').doc(link.id);
    refLink.delete().then(() => {
      console.log(`Link ${link.id} deleted`);
    }).catch((error) => {
      console.log(error);
    });
  }

  const isUserLogedIn = user ? true : false;
  let isLinkOwnedByCurrUser = false;

  if(isUserLogedIn) {
    isLinkOwnedByCurrUser = link.postedBy.id === user.uid;
  }

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>▲</div>
      </div>
      <div className="ml1">
        <div>
          {link.description} <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name} about {distanceInWordsToNow(link.created)}
          {" | "}
          <Link to={`/link/${link.id}`}></Link>
          {link.comments.length > 0
            ? `${link.comments.length} comments`
            : <span className="link">discuss</span>
          }
          {
            isLinkOwnedByCurrUser && (
              <>{" | "}
                <span className="delete-button" onClick={handleDelete}>delete</span>
              </>
            )   
          }
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
