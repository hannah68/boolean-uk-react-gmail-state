import Header from './components/header'
import initialEmails from './data/emails'
import './styles/app.css'
import { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";


function App() {
  const [emails, setEmail] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  // count unread email===========================
  const countUnreadInbox = () => {
    let count = 0;
    emails.map(el => !el.read ? count += 1 : el);
    return count
  }
  // count stared email===========================
  const countStars = () => {
    let count = 0;
    emails.map(el => el.starred ? count += 1 : el);
    return count
  }
  // toggle read ================================
  const toggleRead = (target) => {
    const updatedArr = emails.map(el => {
      return el.id === target.id ? {...el, read: !target.read} : el;
   });
   setEmail(updatedArr);
  } 
  // toggle star================================
  const toggleStar = (target) => {
    const updatedArr = emails.map(el => {
       return el.id === target.id ? {...el, starred: !target.starred} : el;
    });
    setEmail(updatedArr);
  }
  // get unreaded emails=======================
  const getUnReadEmails = emails => emails.filter(email => !email.read);
  let filteredEmail = emails;
  if(hideRead){
    filteredEmail = getUnReadEmails(emails)
  }else{
    filteredEmail = emails;
  }
  

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">{countUnreadInbox()}</span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">{countStars()}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide Read</label>
            <input id="hide-read" type="checkbox" checked={hideRead} onChange={(e) => setHideRead(e.target.checked)}/>
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmail.map(el => {
            return (
              <li className="mail-container" key={el.id}>
                <input type="checkbox" checked={el.read} onChange={() => toggleRead(el)}/>
                <span onClick={() => toggleStar(el)}>{el.starred=== true ? <FaStar/> : <FiStar/>}</span>
                <p className="sender">{el.sender}</p>
                <p className="title">{el.title}</p>
              </li>
          )})}
        </ul>
        
      </main>
    </div>
  )
}

export default App
