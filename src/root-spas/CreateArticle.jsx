import '../style/reactDivMobile.css'
import './styles/CreateArticle.css'
import SECTION_TYPES from '../../full-stack-libs/Types/ArticleSectionTypes'
import { isObjEmpty } from '../../full-stack-libs/utils'

import loadable from "@loadable/component";
import Loading from "../generic-components/Loading"




const _1_SetArticleHeadTagData = loadable(() => import("../operations-components/create-article-parts/_1_SetArticleHeadTagData"), {
  fallback: <Loading />
});
const _2_SetArticleBodyHeader = loadable(() => import("../operations-components/create-article-parts/_2_SetArticleBodyHeader"), {
  fallback: <Loading />
});
const _3_Abstract = loadable(() => import("../operations-components/create-article-parts/_3_Abstract"), {
  fallback: <Loading />
});
const _4_ContentStructure = loadable(() => import("../operations-components/create-article-parts/_4_ContentStructure"), {
  fallback: <Loading />
});
const _5_NestedContentBuilder = loadable(() => import("../operations-components/create-article-parts/_5_NestedContentBuilder"), {
  fallback: <Loading />
});
const _6_ArticleSEOedSubmit = loadable(() => import("../operations-components/create-article-parts/_6_ArticleSEOedSubmit"), {
  fallback: <Loading />
});



class CreateArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      // create_true_edit_false: true, // DEFAULT SET TO CREATE
      // step: 1,
      // // STEP 1
      // html_title: "",
      // changefreq: "",
      // meta_title: "",
      // meta_description: "",
      // canonical: undefined,
      // noindex: false,
      // nofollow: false,
      // // STEP 2
      // keywords: [],
      // category: "",
      // // publisher name, email, and link are default values for now
      // banner_image_name: undefined,
      // banner_image_file: undefined,
      // // banner_image_path
      // banner_img_alt: "",
      // h1: "",
      // // author is logged in username
      // // published_datetime is default now upon creation
      // abstract_name_type: "",
      // abstract_points: [],
      // content_structure: [SECTION_TYPES.H2],
      // nested_data: [],
      // e: undefined,

      
      create_true_edit_false: true,
      step: 1,
      html_title: "How to Create SaaS?",
      changefreq: "weekly",
      meta_title: "How to Create SaaS?",
      meta_description: "Article laying out explicitly and comprehensively how to Create SaaS.",
      noindex: true,
      nofollow: false,
      keywords: [
        "How to Create SaaS?",
        "Is it hard to build a SaaS?",
        "Advantages of SaaS products",
        "What is a SaaS application?",
        "Types of SaaS applications",
        "How to build a software product roadmap",
        "Create SaaS without coding?",
        "Benefits of SaaS apps",
        "Build a SaaS application, product, and business",
        "Build a SaaS step by step",
        "How to build a SaaS by yourself?"
      ],
      category: "business",
      banner_img_alt: "Image of startup headquarters, with software engineers sitting at their desks.",
      h1: "How to Create SaaS?",
      banner_image_name: undefined,
      banner_image_file: undefined,
      abstract_name_type: "Summary",
      abstract_points: [
        "Attaining success is feasible with a <strong>strategic approach</strong> and a <strong>comprehensive understanding of the process.</strong>",
        "Building a SaaS product disposes of <strong>lucrative financial</strong> rewards if <strong>marketing</strong> and <strong>product market fit</strong> is on point.",
        "First, you need to draft a <strong>business plan</strong>, then ask yourself critical questions about your <strong>product, market landscape and competitors</strong>. Finally, you need to market and build your product simultaneously.",
        "You can utilize <strong>no-code, low-code platforms</strong> or use <strong>custom code</strong> solutions.",
        "You can do everything yourself or <strong>hire an agency or freelancers</strong> for building, marketing and design."
      ],
      content_structure: [
        "H2",
        "SUMMERNOTE",
        "IMG",
        "SUMMERNOTE",
        "IMG",
        "H2",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "IMG",
        "H2",
        "SUMMERNOTE",
        "IMG",
        "H2",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "IMG",
        "H2",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "IMG",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "IMG",
        "H3",
        "SUMMERNOTE",
        "H3",
        "SUMMERNOTE",
        "IMG",
        "H2",
        "SUMMERNOTE",
        "EMAIL",
        "SUMMERNOTE",
        "A",
        "H2",
        "SUMMERNOTE"
      ],
      e: undefined,
      nested_data: [
        {
          "id": 1,
          "type": "H2",
          "H2_innerHTML": "Is it hard to build a SaaS?"
        },
        {
          "id": 2,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Firstly, it's essential to know that building a cloud-based Software as a Service (SaaS) product, like any entrepreneurial journey, has particular hurdles and rewards. The main variables that dictate this endeavour's difficulty are the software program's complexity, market competition, and resources available. However, attaining success is feasible with a strategic approach and a comprehensive understanding of the process.</p><p>One of the key benefits of cloud-based SaaS apps is that they provide a recurring revenue model. A successful SaaS business model is an excellent source of cash flow. In contrast, many other business models might not offer this advantage. This aspect can be highly appealing to entrepreneurs and investors, making SaaS a compelling option. It also allows businesses the flexibility to continually improve their product based on customer feedback due to the software industry's essence. The SaaS industry is a market subject to constant new developments.</p>"
        },
        {
          "id": 3,
          "type": "IMG",
          "img_width": 500,
          "img_height": 334,
          "img_alt": "Software developer, Web developer, Programmer image.",
          "img_description": "Software developer, Web developer, Programmer image.",
        },
        {
          "id": 4,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>SaaS products are digital and can service nearly unlimited traffic, offering incredible scalability. The flexibility and adaptability of these applications enable companies to swiftly cater to changing market demands and customer needs. Coupled with the potential for global reach and the promise of recurring revenue, it becomes clear why the SaaS hosted on cloud business model has gained immense popularity in recent years.</p><p>While building a SaaS product might present some challenges, the rewards can be substantial. A well-planned and executed SaaS project can lead to a successful and scalable business. You can achieve significant financial rewards by understanding the following:</p><ol><li>The web, iOS or Android development cycles, and technologies.</li><li>Industry's market demands, i.e. product market fit.</li><li>Clear-cut plan of the software you want to build.<br></li></ol>"
        },
        {
          "id": 5,
          "type": "IMG",
          "img_width": 500,
          "img_height": 500,
          "img_alt": "An oil pastrel of a computer mouse and keyboard.",
          "img_description": "An oil pastrel of a computer mouse and keyboard.",
        },
        {
          "id": 6,
          "type": "H2",
          "H2_innerHTML": "Advantages of SaaS products"
        },
        {
          "id": 7,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>SaaS hosted on the cloud offer numerous advantages. Here are some of the key benefits.<br></p>"
        },
        {
          "id": 8,
          "type": "H3",
          "H3_innerHTML": "Business strategy flexibility based on customer feedback."
        },
        {
          "id": 9,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Cloud-based SaaS products allow businesses to respond rapidly to user feedback, offering flexibility in strategy adjustments. This nimbleness facilitates a customer-centric approach, where you can refine and innovate your offerings based on real-time data and customer insights, improving user satisfaction and loyalty.<br></p>"
        },
        {
          "id": 10,
          "type": "H3",
          "H3_innerHTML": "Market reach and scaling"
        },
        {
          "id": 11,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>The SaaS model empowers businesses to penetrate diverse markets without geographical limitations. Scaling is another considerable advantage, enabling companies to grow effectively. Businesses can adjust resources according to user demand, leading to cost savings and increased efficiency. Technologically speaking, this is allowed thanks to cloud technologies facilitating app de multiplication and OS interoperability.<br></p>"
        },
        {
          "id": 12,
          "type": "H3",
          "H3_innerHTML": "Easy to use for proof of concept testing"
        },
        {
          "id": 13,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Cloud-based SaaS products are excellent for proof-of-concept testing due to their quick accessibility and quick deployment time. They offer a low-risk way to validate your business idea, gauge market response, and pivot your strategy based on real-world data.<br></p>"
        },
        {
          "id": 14,
          "type": "H3",
          "H3_innerHTML": "Third-party integrations for data, payments and analytics"
        },
        {
          "id": 15,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Cloud-based SaaS products can integrate with third-party applications, like payment gateways, data management tools, and analytics platforms.&nbsp;</p><p>These integrations simplify operations and provide valuable insights into customer behaviour, facilitating data-driven decision-making.</p>"
        },
        {
          "id": 16,
          "type": "H3",
          "H3_innerHTML": "Recurring payment model"
        },
        {
          "id": 17,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Cloud-based SaaSs are often set to a recurring payment model, ensuring a predictable and steady revenue stream.&nbsp;</p><p>It's a sustainable business model. The customer receives ongoing value in exchange for regular subscription fees.</p>"
        },
        {
          "id": 18,
          "type": "H3",
          "H3_innerHTML": "Access anytime, anywhere"
        },
        {
          "id": 19,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>One of the appealing aspects of cloud-based SaaS products for SaaS CEOs is that management does not require a fixed geo-location. These web-based applications can be accessed anytime, anywhere. The SaaS business model fits this modern concept of \"digital nomad.\"<br></p>"
        },
        {
          "id": 20,
          "type": "H3",
          "H3_innerHTML": "Learning new technologies, digital marketing and entrepreneurship"
        },
        {
          "id": 21,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>If a SaaS founder decides to bootstrap and not take capital investments, building a SaaS business allows him to learn new technologies, master digital marketing strategies, and develop entrepreneurial skills. Being well-versed in development will benefit his personal affairs.<br></p>"
        },
        {
          "id": 22,
          "type": "IMG",
          "img_width": 640,
          "img_height": 427,
          "img_alt": "Code, Coding, Computer image.",
          "img_description": "Code, Coding, Computer image.",
        },
        {
          "id": 23,
          "type": "H2",
          "H2_innerHTML": "What is a SaaS application?"
        },
        {
          "id": 24,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Software as a Service (SaaS) is software where a service provider hosts applications over the internet's cloud infrastructure and makes them available to users on a subscription basis for their benefit and development.</p><p>The elements required to build and utilize a SaaS are the following:</p><ol><li>Computer, smartphone, tablet, or any device that can connect to the internet.</li><li>A web browser or mobile app distribution system.</li><li>Program's written in code that runs on both server and client devices, enabling requests and responses from both parties.</li><li>Developers to write computer programs.</li><li>DevOps engineers deploy the programs onto third-party providers that give access to servers with pre-built cloud technologies.</li><li>Clients to fetch the UI and data through the web browser, Microsoft OS, apple OS, android or iOS.<br></li></ol>"
        },
        {
          "id": 25,
          "type": "IMG",
          "img_width": 500,
          "img_height": 750,
          "img_alt": "Man holding up a mobile phone with Uber logo displayed on the screen.",
          "img_description": "Man holding up a mobile phone with Uber logo displayed on the screen.",
        },
        {
          "id": 26,
          "type": "H2",
          "H2_innerHTML": "Types of SaaS applications"
        },
        {
          "id": 27,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Many SaaS application types exist today, each designed to cater to specific business or client needs.&nbsp;</p><p>Here are some common types:</p>"
        },
        {
          "id": 28,
          "type": "H3",
          "H3_innerHTML": "CRM software: "
        },
        {
          "id": 29,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Customer Relationship Management (CRM) software helps businesses manage customer interactions. Tasks that can be done on these types of software are: Keeping track of business tasks and customer interactions. Agencyflow, Salesforce and HubSpot are notable examples.<br></p>"
        },
        {
          "id": 30,
          "type": "H3",
          "H3_innerHTML": "Project management:"
        },
        {
          "id": 31,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>SaaS-based project management tools like Asana and Trello enable teams to collaborate effectively, track project progress, and manage tasks, improving workflow productivity and efficiency.<br></p>"
        },
        {
          "id": 32,
          "type": "H3",
          "H3_innerHTML": "Billing software:"
        },
        {
          "id": 33,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>This software type helps manage invoices, track payments, and keep track of transactional history. Examples include QuickBooks and FreshBooks.<br></p>"
        },
        {
          "id": 34,
          "type": "H3",
          "H3_innerHTML": "eCommerce apps:"
        },
        {
          "id": 35,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>These applications simplify selling products online, providing tools for inventory management, payment processing, and customer service. Shopify and BigCommerce are examples.<br></p>"
        },
        {
          "id": 36,
          "type": "H3",
          "H3_innerHTML": "SaaS-based collaboration tools:"
        },
        {
          "id": 37,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Applications like Slack and Microsoft Teams offer teams real-time communication, file sharing, and collaborative workspaces.<br></p>"
        },
        {
          "id": 38,
          "type": "H3",
          "H3_innerHTML": "Human resources management:"
        },
        {
          "id": 39,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>SaaS apps for HR management help businesses automate and streamline HR tasks such as recruiting, employee onboarding, payroll, and benefits administration. BambooHR and Zoho People are common choices.<br></p>"
        },
        {
          "id": 40,
          "type": "H3",
          "H3_innerHTML": "ERP software systems:"
        },
        {
          "id": 41,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Enterprise Resource Planning (ERP) software integrates various business operations into one system, improving data management. Notable examples are SAP and Oracle.<br></p>"
        },
        {
          "id": 42,
          "type": "H3",
          "H3_innerHTML": "Marketing software:"
        },
        {
          "id": 43,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>An example of this type would be software that helps businesses schedule, run, and track ads across various campaigns. But not limited to this, as digital marketing methods and technologies are ever-changing. Examples include Mailchimp and Marketo.<br></p>"
        },
        {
          "id": 44,
          "type": "H3",
          "H3_innerHTML": "Vertical SaaS apps:"
        },
        {
          "id": 45,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>These are industry-specific SaaS applications designed to cater to the unique needs of specific sectors, such as healthcare, real estate, or finance. Veeva (healthcare) and Procore (construction) are examples.<br></p>"
        },
        {
          "id": 46,
          "type": "H3",
          "H3_innerHTML": "Collaboration tools:"
        },
        {
          "id": 47,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>These tools, like Google Workspace and Dropbox, enable team collaboration by technically facilitating file sharing, communication, and task management.<br></p>"
        },
        {
          "id": 48,
          "type": "IMG",
          "img_width": 500,
          "img_height": 500,
          "img_alt": "An oil painting of a man in front of a computer.",
          "img_description": "An oil painting of a man in front of a computer.",
        },
        {
          "id": 49,
          "type": "H2",
          "H2_innerHTML": "How to build a software product roadmap"
        },
        {
          "id": 50,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Building a software product, especially a SaaS application, is a meticulous process that requires careful planning and strategic thinking. Here's a step-by-step guide on how to build a SaaS product from scratch:<br></p>"
        },
        {
          "id": 51,
          "type": "H3",
          "H3_innerHTML": "Step 1: Analyze the market, potential clients, and competitors"
        },
        {
          "id": 52,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Start by conducting comprehensive market research. Determine what tool you wish to build. Understand the needs and pain points of your potential clients. Make sure to scope your SaaS's first build requirements to something specific.&nbsp;</p><p>From personal experience, I recommend focusing your SaaS solution based on quality, not quantity. Instead of building a holistic product that comprises unnecessary overhead like sign-up, log-in, password reset, messaging, and profile edits, construct only the primary requirement that your clients will utilize to alleviate the pain points they are currently having. The secondary features can be built later on, as your goal at the beginning stages is to have a beta version out quickly.</p><p>Before starting, you should ask yourself questions such as:&nbsp;</p><p>Does the product I want to create already exist?&nbsp;</p><p>Are they fulfilling any or most of the market's demands?</p><p>If it doesn't, that is good news. If it does, that is fine as long as there is high demand and the competitor can only fulfill some needs.</p><p><span style=\"color: rgb(51, 51, 51);\">Who are my competitors?</span><br></p><p>Identifying your big and tiny competitors will help you get inspired and understand the final product you want to create.</p><p>How are my competitors marketing their SaaS?</p><p>If I were a targeted client, would I prioritize my product or what the market already offers?</p><p>Your SaaS solution needs to be more efficient and better marketed than the market offers.&nbsp;</p><p>If I were the targeted client, would I naturally gravitate towards my SaaS of industry standards?</p><p>This question is to understand human behaviour trends of how a typical client would fulfill their software needs. This question requires suppositions, but with research, you can nail down the cluster of SaaS that meets client needs.</p><p>Will my tool be lucrative long term?&nbsp;</p><p>It would be best if you planned on monetization methods. Examples of monetization are integrating ad banners from an advertising platform, Affiliate marketing, subscription model integration, and selling products or services.</p><p><span style=\"color: rgb(51, 51, 51);\">If something wrong happened along the way, how would I pivot, and towards what strategy?</span><br></p><p>Planning a way to morph your app beforehand towards other markets can be helpful as soon you realize there is a low demand for your service. Keep in mind that clients and other businesses are the ones that define market demand.</p><p>Do I have a marketing plan?</p><p>A good mental exercise is imagining your SaaS is already built. Starting with marketing before making your software is a legitimate good business strategy. That way, once you finish the technicalities, you will seamlessly onboard your first clients. A misconception about SaaS is that it is all technical know-how. Still, marketing is just, if not more, as necessary.</p><p>What are the market products' weak points?</p><p>What can I improve upon?</p><p>How can I offer something better in functionality and design?&nbsp;</p><p>What is the overall market landscape, and does my solution compete with the most up-to-date technologies and prices?</p><p>Is the product I want to build relevant or obsolete?</p><p>Will my product be the cheapest, most effective solution out there?&nbsp;</p><p>This analysis will provide the necessary insights to design a product that effectively addresses user needs and stands out in the developing and competitive landscape.</p>"
        },
        {
          "id": 53,
          "type": "IMG",
          "img_width": 500,
          "img_height": 334,
          "img_alt": "Startup, Meeting, Brainstorming image.",
          "img_description": "Startup, Meeting, Brainstorming image.",
        },
        {
          "id": 54,
          "type": "H3",
          "H3_innerHTML": "Step 2: Develop a business plan"
        },
        {
          "id": 55,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Next, once you mapped out all the answers to the questions in step one, you must write a robust business plan outlining your value proposition, target audience, marketing strategies, operational procedures, development strategy and financial projections.&nbsp;</p><p>An essential part of this document is highlighting your projected app monetization model. This document is crucial to potentially reaping investor seed investments if that is a route you wish to take.</p>"
        },
        {
          "id": 56,
          "type": "H3",
          "H3_innerHTML": "Step 3: Define SaaS's technical requirements"
        },
        {
          "id": 57,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Following the business plan's essence, outline your SaaS's technical requirements and development processes. Your business plan is subject to edits.</p><p>At this point, you should focus on defining the main requirement of your app and then break it down into more minor requirements that can translate into tangible programmatic operations. Also, it would be best to determine the tools you will use to keep track of and enable the development of your application.</p><p>After articulating the technical components of your app, you need to define what those programs implicitly require in terms of security. When building the application, focus on laying out the security foundations before making the main feature because doing the reverse is more complicated. It is better to create security features on an empty slate than to add security requirements on top modules you already made. The former is bug-prone.</p><p>Next, you need to create the user interface's UI layouts and define the generic flow of those UIs. How will the UIs be displayed to your clients, and in what order? i.e. user experience UX. Another critical aspect is the technical stack you'll use for development. Choose technologies that align with your product requirements and allow scalability and efficient performance. Also, plan for third-party integration. Ensure your SaaS integrates smoothly with other tools and applications your potential clients might use.</p>"
        },
        {
          "id": 58,
          "type": "IMG",
          "img_width": 500,
          "img_height": 500,
          "img_alt": "A man writing computer code.",
          "img_description": "A man writing computer code.",
        },
        {
          "id": 59,
          "type": "H3",
          "H3_innerHTML": "Step 4: Build an MVP"
        },
        {
          "id": 60,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>A Minimum Viable Product (MVP) is a simplified version of your SaaS with just the essential feature.&nbsp;</p><p>At this point, you already have a small audience from your marketing. You can now validate your product idea, gather user feedback, and make necessary adjustments before investing more time and resources into perfecting your software or adding new features.</p><p>In the SaaS industry jargon, your MVP is also known as a Beta version of your app, and when launching, you are looking for your first clients or testers.</p>"
        },
        {
          "id": 61,
          "type": "H3",
          "H3_innerHTML": "Step 5: Production and maintenance"
        },
        {
          "id": 62,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>After ensuring your MVP is functional through testing, your SaaS is ready to be deployed to what is known in the industry as production on cloud infrastructure. A production environment is your app's server environment to be accessible live.</p><p>However, the work continues beyond launch. Regular maintenance, updates, and enhancements are vital to keep your software running smoothly and meet the evolving needs of your users.</p>"
        },
        {
          "id": 63,
          "type": "IMG",
          "img_width": 500,
          "img_height": 500,
          "img_alt": "A small server on a table in 3D render.",
          "img_description": "A small server on a table in 3D render.",
        },
        {
          "id": 64,
          "type": "H2",
          "H2_innerHTML": "Create SaaS without coding?"
        },
        {
          "id": 65,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>You can outsource development and design to a freelancer or agency to build the app or make it all yourself. If you decide to make the app yourself, you will spare yourself money, but this will cost you much time to learn the skills to build, design and market your app.&nbsp;</p><p>Suppose you outsource to freelancers to produce the design, code, build and manage marketing. In that case, this will cost copious amounts of money, but you will save time.&nbsp;</p><p>Either way, you or your hiree can utilize no-code SaaS builders, low-code platforms, and tools. I have compiled a list of my best picks of the no-code and low-code platforms I would use to rebuild a cloud-based SaaS from scratch today. I will send you that list with tips on making it function with low hands-on maintenance and fees. All you need to do is submit your email below.</p>"
        },
        {
          "id": 66,
          "type": "EMAIL",
          "EMAIL_title": "Secrets to build and automate!",
          "EMAIL_subtitle": "Click the download below to get Bidblock’s guide to making web systems by leveraging third-party tools.",
          "BUTTON_text": "download",
          "RESOURCE_path": "/resources/pdfs/web_keys.pdf"
        },
        {
          "id": 67,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>These no-code platforms offer users visual interfaces where you can drag and drop components to build your application.</p><p>On the other hand, low-code platforms are a bit more complex, requiring some coding knowledge, but they provide more customization options.</p><p>@ Bidblock we deliver software, AI, automation, and data manipulation to streamline your business:<br></p>"
        },
        {
          "id": 68,
          "type": "A",
          "A_href": "/contact",
          "A_title": "bidblock.ca contact page",
          "newtab": false,
          "nofollow": false,
          "ugc": false,
          "noopener": false,
          "image_mode_on": false,
          "A_innerText": "Go to the contact page"
        },
        {
          "id": 69,
          "type": "H2",
          "H2_innerHTML": "Conclusion"
        },
        {
          "id": 70,
          "type": "SUMMERNOTE",
          "SUMMERNOTE_innerHTML": "<p>Remember, building a cloud-based SaaS product involves more than just development. Pay close attention to customer needs, and always be ready to iterate and improve your product based on user feedback.<br></p>"
        }
      ]




    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.setStateStep = this.setStateStep.bind(this)

    this.handleChange = this.handleChange.bind(this)
    // this.handleChange2 = this.handleChange2.bind(this)
    this.setStateBannerImage = this.setStateBannerImage.bind(this)
    this.handleCheck = this.handleCheck.bind(this)

    this.asyncMaster = this.asyncMaster.bind(this)


  }

  promise1 = (image) => {
    const { name, path } = image;

    console.log(name, path)

    return new Promise((resolve, reject) => {

      fetch(path)

        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            reject(new Error('Request failed'));
          }
        })

        .then(blob => {
          const file = new File([blob], name, { type: blob.type });

          console.log('Loaded image file:', file);
          resolve(file)
        })


        .catch(error => {
          reject(error);
        });

    });



  }



  asyncMaster = async (allImagesURLs) => {

    const promiseFunctions = allImagesURLs.map((url) => this.promise1(url));

    Promise.all(promiseFunctions).then((files) => {


      const [banner_image_file, ...block_files] = files
      console.log(block_files);

      console.log(pre_load_article_4_edit.articlenesteddata_id.blocks)


      // STEP 1: POPULATE IMAGE URLS
      for (let i = 0; i < pre_load_article_4_edit.articlenesteddata_id.blocks.length; i++) {

        console.log(pre_load_article_4_edit.articlenesteddata_id.blocks[i].type, !(pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.IMG || pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.A))

        // IF BLOCK not IMG  nor A SKIP
        if (!(pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.IMG || pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.A)) {
          continue
        }





        // IF BLOCK IMG, or A, and does not have a image field SKIP
        if (!pre_load_article_4_edit.articlenesteddata_id.blocks[i].image) {
          continue
        }

        console.log('hit!')
        // IF BLOCK IMG, or A, and has a image field then ...
        pre_load_article_4_edit.articlenesteddata_id.blocks[i].image.image_file = block_files.shift()

      }

      console.log('final: ', pre_load_article_4_edit.articlenesteddata_id.blocks)


      // Place the files
      // set state


      this.setState({
        step: 1,
        // STEP 1
        html_title: pre_load_article_4_edit.html_title,
        meta_title: pre_load_article_4_edit.articleheadtag_id.meta_title,
        changefreq: pre_load_article_4_edit.changefreq,
        meta_description: pre_load_article_4_edit.articleheadtag_id.meta_description,
        canonical: pre_load_article_4_edit.articleheadtag_id.canonical,
        noindex: pre_load_article_4_edit.articleheadtag_id.noindex,
        nofollow: pre_load_article_4_edit.articleheadtag_id.nofollow,
        // STEP 2
        keywords: pre_load_article_4_edit.articlebodyheader_id.keywords,
        category: pre_load_article_4_edit.articlebodyheader_id.category,
        // publisher name, email, and link are default values for now
        banner_image_name: pre_load_article_4_edit.articleenclosureimage_id.banner_image_originalname,
        banner_image_file: banner_image_file,
        // banner_image_path
        banner_img_alt: pre_load_article_4_edit.articleenclosureimage_id.banner_img_alt,
        h1: pre_load_article_4_edit.h1,
        // author is logged in username
        // published_datetime is default now upon creation
        abstract_name_type: pre_load_article_4_edit.articleabstract_id.abstract_name_type,
        abstract_points: pre_load_article_4_edit.articleabstract_id.abstract_points,
        content_structure: pre_load_article_4_edit.articlenesteddata_id.content_structure,
        nested_data: pre_load_article_4_edit.articlenesteddata_id.blocks
      });

    });

  }


  componentDidMount() {
    console.log('componentDidMount: ', pre_load_article_4_edit, allImagesURLs);

    if (isObjEmpty(pre_load_article_4_edit)) {
      console.log('nothing to load');
      return;
    }
    
    this.setState({create_true_edit_false: false}) // SET TO EDIT

    // BANNER IMAGE
    console.log(pre_load_article_4_edit.articleenclosureimage_id?.path);


    this.asyncMaster(allImagesURLs)

  }



  componentDidUpdate() {

    console.log("\n\nCreateArticle: componentDidUpdate: this.state.nested_data\n\n", this.state.nested_data)

  }


  handleChange = (e, input_name_val_object = undefined) => {
    // console.log(input_name_val_object, e)

    // const undefined_fields = ['canonical']
    const should_be_set_as_array_state_elements = ['keywords', "abstract_points", "content_structure"]
    const parse_bidblock_to_strong_tag = ["abstract_points"]

    // console.log("\n\ne.target.name: ", e.target?.name)

    // console.log("\n\ne.target.value: ", e.target?.value)

    let stateValue = e.target?.value

    if (parse_bidblock_to_strong_tag.includes(e.target?.name)) {
      // console.log('parsing...')
      stateValue = e.target?.value.replace(/\[/g, '<strong>').replace(/\]/g, '</strong>');
      // stateValue = JSON.stringify(stateValue);
    }

    if (should_be_set_as_array_state_elements.includes(e.target?.name)) {
      stateValue = stateValue.split(',  ')
    }
    // console.log(stateValue)

    if (input_name_val_object) {
      this.setState({
        [input_name_val_object.name]: input_name_val_object.value
      })
      return
    }


    this.setState({
      [e.target?.name]: stateValue
    })
    return
  }

  handleCheck = (e) => {

    // console.log("\n\ne.target.name: ", e.target.name)
    // console.log("\n\ne.target.checked: ", e.target.checked)

    this.setState({
      // [e.target.name]: !this.state[e.target.name]
      [e.target.name]: e.target.checked
    })
  }



  setStateBannerImage = (banner_image_name, banner_image_file) => {
    this.setState({
      banner_image_name: banner_image_name,
      banner_image_file: banner_image_file,
    })
  }

  setStateStep(step) {
    this.setState({
      step: step
    })
  }

  nextStep = (e) => {
    e?.persist();
    this.setState({
      step: ++this.state.step,
      e: e?.nativeEvent
    })
  }
  previousStep = (e) => {
    e?.persist();
    this.setState({
      step: --this.state.step,
      e: e?.nativeEvent
    })
  }

  componentStep(step) {
    let component
    switch (step) {
      case 1:
        component = <_1_SetArticleHeadTagData
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          setStateStep={this.setStateStep}
          step={step}
          nextStep={this.nextStep}
          validateInputs={this.validateInputs}

          html_title={this.state.html_title}
          meta_title={this.state.meta_title}
          changefreq={this.state.changefreq}
          meta_description={this.state.meta_description}
          canonical={this.state.canonical}
          noindex={this.state.noindex}
          nofollow={this.state.nofollow}
        />
        break;
      case 2:
        component = <_2_SetArticleBodyHeader
          handleChange={this.handleChange}
          // handleChange2={this.handleChange2}
          setStateBannerImage={this.setStateBannerImage}
          validateInputs={this.validateInputs}

          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}

          keywords={this.state.keywords}
          category={this.state.category}
          banner_img_alt={this.state.banner_img_alt}
          h1={this.state.h1}

          banner_image_name={this.state.banner_image_name}
          banner_image_file={this.state.banner_image_file}
        />
        break;
      case 3:
        component = <_3_Abstract
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          validateInputs={this.validateInputs}

          abstract_name_type={this.state.abstract_name_type}
          abstract_points={this.state.abstract_points}

        />
        break;
      case 4:
        component = <_4_ContentStructure
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          validateInputs={this.validateInputs}

          content_structure={this.state.content_structure}
          addSelect={this.addSelect}
          deleteSelect={this.deleteSelect}
          handleChangeInputs={this.handleChangeInputs}
        />
        break;
      case 5:
        component = <_5_NestedContentBuilder
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          e={this.state.e}

          content_structure={this.state.content_structure}
          nested_data={this.state.nested_data}
          innerHandleChange={this.innerHandleChange}
          innerHandleChangeToogleDeleteFields={this.innerHandleChangeToogleDeleteFields}
          validateInputs={this.validateInputs}
        // innerIMGOnChange={this.innerIMGOnChange}
        />
        break;
      case 6:
        component = <_6_ArticleSEOedSubmit
          step={step}
          setStateStep={this.setStateStep}
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          setStateBannerImage={this.setStateBannerImage}

          html_title={this.state.html_title}
          meta_title={this.state.meta_title}
          changefreq={this.state.changefreq}
          meta_description={this.state.meta_description}
          canonical={this.state.canonical}
          noindex={this.state.noindex}
          nofollow={this.state.nofollow}
          keywords={this.state.keywords}
          category={this.state.category}
          banner_img_alt={this.state.banner_img_alt}
          h1={this.state.h1}
          banner_image_name={this.state.banner_image_name}
          banner_image_file={this.state.banner_image_file}

          abstract_name_type={this.state.abstract_name_type}
          abstract_points={this.state.abstract_points}
          content_structure={this.state.content_structure}
          nested_data={this.state.nested_data}

          create_true_edit_false={this.state.create_true_edit_false} 
          articleID_to_preload_4_edit={pre_load_article_4_edit._id}
        />
        break;
      default:
        component = null
        break;
    }

    return component
  }


  render() {
    let component = this.componentStep(this.state.step)

    return (
      <React.Fragment>
        <div id='create-article'>
          <div id="nest-1">

            {this.state.step != 5 ?
              <a id='reset' href="/operations/create-article">
                <img src="/img/SVG/operations/create-article/reset.svg" alt="" />
                <span>Reset</span>
              </a> : null}


            {component}

          </div>
        </div>

      </React.Fragment>
    )
  }


  validateInputs(e) {
    let inputs = document.getElementsByTagName('input');
    const selects = document.getElementsByTagName('select');
    const textareas = document.getElementsByTagName('textarea');

    inputs = [...inputs]

    let isValid = true;

    // Find the input elements with the desired IDs
    var inputBannerImgIdInput = inputs.find(function (input) {
      return input.id === 'input-img-id-or-validation';
    });

    var imageSrcInput = inputs.find(function (input) {
      return input.id === 'image-src';
    });

    // Check if both inputs are present
    if (inputBannerImgIdInput && imageSrcInput) {
      // console.log("Both input IDs are present in the array.");
      // Perform additional actions with the inputs if needed

      // Check if both required inputs are missing
      if (!inputBannerImgIdInput.checkValidity() && !imageSrcInput.checkValidity()) {
        !imageSrcInput.checkValidity() ? imageSrcInput.reportValidity() : null
        !inputBannerImgIdInput.checkValidity() ? inputBannerImgIdInput.reportValidity() : null
        isValid = false;
      }


    }

    // console.log('isValid', isValid)
    if (!isValid) {
      return isValid
    }




    inputs = inputs.filter(function (input) {
      return !['input-img-id-or-validation', 'image-src'].includes(input.id);
    });

    // console.log(inputs)
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];


      if (input.required && !input.checkValidity()) {

        // console.log('\n\ninput.id--->', input.id)

        // Input is invalid, trigger validation error message
        input.reportValidity();
        isValid = false;
        break
      }
    }

    for (let i = 0; i < selects.length; i++) {
      const select = selects[i];
      if (select.required && !select.checkValidity()) {
        // Input is invalid, trigger validation error message
        select.reportValidity();
        isValid = false;
        break
      }
    }

    for (let i = 0; i < textareas.length; i++) {
      const textarea = textareas[i];
      if (textarea.required && !textarea.checkValidity()) {
        // Input is invalid, trigger validation error message
        textarea.reportValidity();
        isValid = false;
        break
      }
    }

    // console.log(isValid)
    return isValid

  }



  innerHandleChangeToogleDeleteFields = (e, type2edit = undefined, id = undefined, toogle_state, fields_todelete) => {

    var eventTargetName = e.target.name
    // console.log(e.target.type, type2edit, id, eventTargetName, toogle_state)

    // if (eventTargetName != 'image_mode_on') return

    if (!type2edit || !id) return

    this.setState(prevState => {
      let updateNestedData = [...prevState.nested_data];

      let object = updateNestedData.find((object) => {
        return object.type == type2edit && object.id == id
      })

      // console.log({ object })



      // Create new input object if no object available
      if (object) {
        // console.log('already created..')
        let objIndex = updateNestedData.findIndex((obj => {
          return (obj.type == type2edit && obj.id == id)
        }));

        // console.log('updateNestedData[objIndex]', updateNestedData[objIndex])
        fields_todelete.forEach(field => {
          delete updateNestedData[objIndex][field]
        });
      }

      return { nested_data: updateNestedData }
    });

    return
  }

  resetInnerHandleChange= (e, type2edit = undefined, id = undefined, resetWhatAndToArrObj = []) => {

    if (!type2edit || !id) return

    
  }



  innerHandleChange = (e, type2edit = undefined, id = undefined) => {

    var eventTargetName = e.target.name
    console.log("\n\n__________\n\ne.target.type, type2edit, id, eventTargetName\n")
    console.log(e.target.type, type2edit, id, eventTargetName, '\n\n')

    let value
    switch (e.target.type) {
      case "text":
        value = e.target.value
        break;
      case "checkbox":
        value = e.target.checked
        break;
      case "file":
        const image_file = e.currentTarget.files[0]
        const image_name = e.currentTarget.files[0].name
        value = {
          image_file: image_file,
          image_name: image_name
        }
        break;
      default:
        value = e.target.value
        break;
    }


    if (!type2edit || !id) return

    this.setState(prevState => {
      let updateNestedData = [...prevState.nested_data];

      let object = updateNestedData.find((object) => {
        return object.type == type2edit && object.id == id
      })

      // console.log({ object })



      // Create new input object if no object available
      if (!object) {
        // console.log('create..')
        object = {
          id: id,
          // e.target.type
          type: type2edit,
          [eventTargetName]: value
        }
        updateNestedData = [...prevState.nested_data, object]
        // Edit input object if object available
      } else {

        // console.log('already created..')
        let objIndex = updateNestedData.findIndex((obj => {
          return (obj.type == type2edit && obj.id == id)
        }));

        if (value == "") {
          delete updateNestedData[objIndex][eventTargetName]
          return { nested_data: updateNestedData }
        }

        // console.log('updateNestedData[objIndex]', updateNestedData[objIndex])
        updateNestedData[objIndex][eventTargetName] = value


      }

      return { nested_data: updateNestedData }
    });

    return

  }





  addSelect = () => {
    this.setState(prevState => {
      // const updated_content_structure = [...prevState.content_structure];
      return { content_structure: [...prevState.content_structure, ''] }
    });
  };

  deleteSelect = (index, block_type) => (e) => {

    this.setState(prevState => {
      const updated_content_structure = [...prevState.content_structure];


      updated_content_structure.splice(index, 1); // Remove the input at the specified index


      const updated_nested_data = [...prevState.nested_data];
      const block = updated_nested_data[index]


      // TODO !!! Also try to reduce this component
      // console.log({ block_type })
      // console.log('block?.type ', block?.type)
      // console.log('block?.type === block_type ', block?.type === block_type)

      if (block?.type === block_type) {
        updated_nested_data?.splice(index, 1)
        for (let i = index; i < updated_nested_data.length; i++) {
          updated_nested_data[i].id = i + 1;
        }
      }

      return {
        content_structure: updated_content_structure,
        nested_data: updated_nested_data
      };
    });
  };

  handleChangeInputs = (index) => (event) => {

    // console.log('handleChangeInputs: ', index)
    const { value } = event.target;

    this.setState(prevState => {




      const updated_content_structure = [...prevState.content_structure];
      updated_content_structure[index] = value;

      const updated_nested_data = [...prevState.nested_data];

      if (!updated_nested_data[index]?.id && !updated_nested_data[index]?.type) {
        return {
          content_structure: updated_content_structure,
        };
      }


      const { id, type } = updated_nested_data[index];

      // Remove all properties except id
      for (let key in updated_nested_data[index]) {
        if (key !== 'id') {
          delete updated_nested_data[index][key];
        }
      }

      // Modify the type property
      updated_nested_data[index].type = value;


      return {
        content_structure: updated_content_structure,
        nested_data: updated_nested_data
      };
    });
  };






}


const element = <CreateArticle />;

ReactDOM.render(element, document.getElementById('react-div'));

export default CreateArticle



// TODO !!!
// Case sensivety on login
// Footer link build
// Publish and archive market orders
// Textarea resize stop the capability to drag