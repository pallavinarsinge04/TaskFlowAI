import { useState } from "react";

import {
  FaCopy,
  FaCheck,
  FaRedo,
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
} from "react-icons/fa";

function MessageActions({

  content,

  onRegenerate,

}) {

  const [copied, setCopied] =
    useState(false);

  const [liked, setLiked] =
    useState(null);

  const copy = async () => {

    await navigator.clipboard.writeText(
      content
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  const share = async () => {

    if (navigator.share) {

      await navigator.share({

        text: content,

      });

    } else {

      await navigator.clipboard.writeText(
        content
      );

      alert("Copied for sharing.");

    }

  };

  return (

    <div className="message-actions">

      <button onClick={copy}>

        {

          copied

          ?

          <FaCheck/>

          :

          <FaCopy/>

        }

      </button>

      <button
        onClick={onRegenerate}
      >

        <FaRedo/>

      </button>

      <button

        className={
          liked===true
          ?
          "active"
          :
          ""
        }

        onClick={()=>setLiked(true)}

      >

        <FaThumbsUp/>

      </button>

      <button

        className={
          liked===false
          ?
          "active"
          :
          ""
        }

        onClick={()=>setLiked(false)}

      >

        <FaThumbsDown/>

      </button>

      <button onClick={share}>

        <FaShareAlt/>

      </button>

    </div>

  );

}

export default MessageActions;