import React, { Fragment } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const TITLE = 'Pick an Emoji'

const handleChange = props => ({target}) => props.onSelect({ native: target.value })

const MobilePicker = props => (
  <div className="column">
    <input
      type="text"
      className="input is-large is-borderless is-shadowless emoji-input"
      style={{width:'100%'}}
      value={props.value}
      onChange={handleChange(props)}
      />
  </div>
)

const EmojiPicker = props => {
  return (
    <div className="navbar-item emoji-picker has-dropdown is-hoverable">
      <div className="navbar-item">
        <input
          type="text"
          className="input is-large is-block-touch is-borderless is-shadowless emoji-input"
          value={props.value}
          onChange={handleChange(props)}
        />
      </div>
      <div className="navbar-dropdown is-boxed is-right" style={{clear:'both', padding: 6}}>
        <Picker
          onSelect={props.onSelect}
          emoji=''
          showPreview={false}
          title={TITLE}
          exclude={['recent']}
        />
      </div>
    </div>
  )
}

const Header = ({ characters, loading, ...props}) => (
  <Fragment>
    <nav className="navbar is-warning" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h3 className="subtitle is-3">
              <span
                role="img"
                aria-label="spin"
                className={`logo ${loading ? 'loading' : ''}`}>🌀</span>
              emoji encoder
            </h3>
          </a>
        </div>
        <div className="navbar-end is-hidden-touch">
          <EmojiPicker key={1} value={characters[0]} onSelect={props.handleSelect(0)} />
          <EmojiPicker key={2} value={characters[1]} onSelect={props.handleSelect(1)} />
        </div>
      </div>
    </nav>
    <div className="section is-hidden-desktop">
      <p>Choose <strong>emoji</strong> to encode/decode with: </p>
      <br />
      <div className="columns is-mobile">
        <MobilePicker key={1} value={characters[0]} onSelect={props.handleSelect(0)} />
        <MobilePicker key={2} value={characters[1]} onSelect={props.handleSelect(1)} />
      </div>
      <p>Type or Paste your <strong>message</strong> to encode/decode below.</p>
    </div>
  </Fragment>
)

export default Header
