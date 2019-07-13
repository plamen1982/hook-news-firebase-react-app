import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

function LinkDetail(props) {
  const { firebase: { db }, user } = useContext(FirebaseContext);
  const { match: { params: { linkId } } } = props;
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState('');
  const linkRef = db.collection('links').doc(linkId);

  useEffect(() => {
    getLink();
  }, []);

  function getLink(){
    linkRef.get().then(link => {
      //TODO switch the id with ...link.data()
      setLink({...link.data(), id: link.id})
    });
  };

  function handleAddComment() {
    if(!user) {
      props.history.push('/');
    } else {
      linkRef.get().then((linkDoc) => {
        if(linkDoc.exists) {

          const previousComments = linkDoc.data().comments;
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          }
          const updatedComments = [...previousComments, comment];
          linkRef.update({ comments: updatedComments });

          setLink((prevState) => ({
            ...prevState,
            comments: updatedComments
          }))
          setCommentText('');
        }
      })
    }
  }

  return !link 
  ?(
    <div>...Loading</div>
  )
  :(
    <div>
      <LinkItem link={link} showCount={false} />
      <textarea
        onChange={event => setCommentText(event.target.value)}
        value={commentText}
        rows='6'
        cols='60'
      >
      </textarea>
      <button className="button" onClick={handleAddComment} >add comment</button>
      {link.comments.map((comment, index) => (
        <div>
          <div key={index}>
            <p className="comment-author">{comment.postedBy.name} | {distanceInWordsToNow(comment.created)}</p>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LinkDetail;
