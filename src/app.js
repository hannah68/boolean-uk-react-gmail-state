import Header from './components/header'
import initialEmails from './data/emails'
import './styles/app.css'
import { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";


function App() {
  const [emails, setEmail] = useState(initialEmails);

  const countUnreadInbox = () => {
    let count = 0;
    emails.map(el => !el.read ? count += 1 : el);
    return count
  }

  const countStars = () => {
    let count = 0;
    emails.map(el => el.starred ? count += 1 : el);
    return count
  }

  const toggleRead = (target) => {
    const updatedArr = emails.map(el => {
      return el.id === target.id ? {...el, read: !target.read} : el;
   });
   setEmail(updatedArr);
  } 

  const toggleStar = (target) => {
    const updatedArr = emails.map(el => {
       return el.id === target.id ? {...el, starred: !target.starred} : el;
    });
    setEmail(updatedArr);
  }
  const [checked, setChecked] = useState(false)
  const getReadEmails = (emails) => {
      const updatedArr = emails.filter(el => {
        return  !el.read 
     });
      setEmail(updatedArr);
      setChecked(!checked);
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
            <label htmlFor="hide-read">Hide read</label>
            <input id="hide-read" type="checkbox" checked={checked} onChange={() => getReadEmails(emails)}/>
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map(el => {
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
