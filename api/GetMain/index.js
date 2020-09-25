const U = require("../Shared/Utils.js")
const html = require("nanohtml")

module.exports = async function (context, req) {
  return U.hr(html`
    <div class="section">
    <div class="container">
      <article class="level">
        <div class="level-item">
          <figure class="image">
            <img src="/img/roll-the-dice-phone.jpg" alt="Image">
          </figure>
        </div>
        <div class="level-item">
          <p class="has-text-centerd is-size-5">
          <strong>Do things randomly !</strong>
          </p>
        </div>
      </article>
      </div>
    </div>
  `)
};
