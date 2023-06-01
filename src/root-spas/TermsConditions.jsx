import '../style/reactDivMobile.css'
import './styles/TermsConditions.css'


class TermsConditions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (

      // Home
      <React.Fragment>
        <main id="terms-conditions-high-component">
          <h1>Terms and conditions </h1>
          <section>
            <h2>Introduction</h2>
            <div>
              <span>These terms and conditions (The 'Terms and conditions') govern using Bidblock registered and identified:</span>
              <ul>
                <li>at the Canadian Government: 12910713 Canada Inc</li>
                <li>at the world wide web by https://bidblock.ca (1)</li>
              </ul>
              <span>This site is owned and operated by Bidblock. This site is an e-commerce website.</span>
              <span>By using this site, you indicate that you have read and understand these terms and conditions and agree to abide by them at all times.</span>
            </div>

          </section>

          <section>
            <h2>Intellectual property</h2>
            <div>
              <span>All content published and made available on our website: https://bidblock.ca is the property of Bidblock, a registered business at the Canadian government: 12910713 Canada Inc.</span>
              <span>The content posted includes but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the compositions of our site.</span>
              <span> Entire website code is regimented by the intellectual property laws of the Canadian Intellectual Property Office Canadian Copyright © issued by Innovation, Science and Economic Development Canada.</span>
              <span> Copyright registered the 12th of October 2021 under the registration number 1187187. Copyright covers all future and past software edits.</span>
              <span>This site is owned and operated by Bidblock. This site is an e-commerce website.</span>
              <span>By using this site, you indicate that you have read and understand these terms and conditions and agree to abide by them at all times.</span>
            </div>
          </section>



          <section>
            <h2>User contributions</h2>
            <div>
              <span>Users may post the following on our website:</span>
              <ul>
                <li>Items for sale</li>
                <li>Photos</li>
              </ul>
              <span>By posting publicly on our website, you agree not to act illegally (2) or violate these terms and conditions.</span>

            </div>
          </section>


          <section>
            <h2>Accounts</h2>
            <div>
              <span>When you create an account on our site, you agree to the following:</span>
              <ol>
                <li> You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and </li>
                <li>All personal information you provide through your account is up-to-date, accurate, and truthful. The information provided is the most up-to-date information.</li>
              </ol>

              <span>We reserve the right to suspend or terminate your account if you use our site illegally or violate these Terms and Conditions.</span>

            </div>
          </section>


          <section>
            <h2>User Goods and Services</h2>
            <div>
              <span>Our website allows users to sell goods and services.</span>
              <span>We do not assume responsibility for the goods and services users sell on our website. </span>
              <span>Therefore, we cannot guarantee the quality or accuracy of the descriptions of any goods and services sold by users on our website.</span>
              <span>When a user violates these Terms and Conditions, we reserve the right to delete or suspend the concerned user's account. (3)</span>
            </div>
          </section>


          <section>
            <h2>Links to Other Websites</h2>
            <div>
              <span>Our Site loads links to third-party domains that we do not own or control.</span>
              <span>We are not responsible for the content, policies, or practices of any third-party website or service linked or loaded on our website. </span>
              <span>You are responsible for reading the terms and conditions and privacy policies of these third-party websites before using them.</span>
            </div>
          </section>


          <section>
            <h2>Limitation of Liability</h2>
            <div>
              <span>Bidblock (4) and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses, including legal fees, from your website's use.</span>
            </div>
          </section>


          <section>
            <h2>Indemnity</h2>
            <div>
              <span>Except where prohibited by law, by using this website, you indemnify and hold harmless BidBlock and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses, including legal fees arising out of your use of our website or your violation of these Terms and Conditions.</span>
            </div>
          </section>

          <section>
            <h2>Applicable law</h2>
            <div>
              <span>The laws of the Province of Quebec govern these Terms and Conditions.</span>
            </div>
          </section>

          <section>
            <h2>Severability</h2>
            <div>
              <span>Suppose at any time any of the provisions outlined in these Terms and Conditions are found to be inconsistent or invalid under applicable laws.</span>
              <span>In that case, those provisions will be deemed void and removed from these Terms and Conditions.</span>
              <span>The removal will not affect all other provisions, and the rest of these Terms and Conditions will still be considered valid.</span>
            </div>
          </section>

          <section>
            <h2>Changes</h2>
            <div>
              <span>These Terms and Conditions may be amended occasionally to maintain compliance with the law and to reflect any changes to how we operate our Site and how we expect users to behave on our website.</span>
              <span>We will notify users by email of changes to these Terms and Conditions or post a notice on our website.</span>
            </div>
          </section>


          <section>
            <h2>Contact Details </h2>
            <div>
              <span>Please get in touch with us if you have any questions or concerns.</span>
            </div>
          </section>


          <aside>
            <h2>Annexe</h2>
            <ul>
              <li>
                <span>
                  <b>(1) </b>
                  Site, and website: https://bidblock.ca
                </span>
              </li>
              <li>
                <span>
                  <b>(2) </b>
                  Illegal: In terms of Canada's and Quebec's and, in some cases user's living country jurisdictions
                </span>
              </li>

              <li>
                <span>
                  <b>(3) </b>
                  Delete or suspend account: To prohibit users from selling goods and services on our website.
                </span>
              </li>

              <li>
                <span>
                  <b>(4) </b>
                  Bidblock: Business registered at the Canadian federal government: 12910713 Canada Inc.
                </span>
              </li>


            </ul>
          </aside>

        </main>
      </React.Fragment>

    );
  }



}

const element = <TermsConditions />;


ReactDOM.render(element, document.getElementById('react-div'));


export default TermsConditions