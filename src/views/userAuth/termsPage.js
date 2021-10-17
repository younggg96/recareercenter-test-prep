import React from "react";

// import {
//     Button,
//     Icon,
//     Input,
//     Layout,
//     Text,
//     TopNavigation,
//     TopNavigationAction,
// } from "@ui-kitten/components";
import { Image, Keyboard, KeyboardAvoidingView, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/userAuth/landingStyle";


const TermsPage = ({ navigation }) => {
    return (
        <>
            <TopBar title="Terms and Privacy" navigation={navigation} hasBack={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 24 }}>
                <Text style={styles.header}>Privacy Policy</Text>
                <Text numberOfLines={100}>
                    {"\n"}Your privacy is important to us. It is Center For Real Estate Education's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, https://recareercenter.com, apps, CFREE Real Estate Exam Prep App and other sites and apps we own and operate.
                    {"\n"}
                    {"\n"}Personal information is any information about you which can be used to identify you. This includes information about you as a person (such as name, address, and date of birth), your devices, payment details, and even information about how you use a website or online service.
                    {"\n"}
                    {"\n"}In the event our site contains links to third-party sites and services, please be aware that those sites and services have their own privacy policies. After following a link to any third-party content, you should read their posted privacy policy information about how they collect and use personal information. This Privacy Policy does not apply to any of your activities after you leave our site.
                    {"\n"}
                    {"\n"}This policy is effective as of 30 September 2021.
                    {"\n"}
                    {"\n"}Last updated: 30 September 2021
                </Text>
                <Text style={styles.header}>{"\n"}Information We Collect</Text>
                <Text numberOfLines={100}>
                    {"\n"}Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.
                    {"\n"}
                    {"\n"}Log Data
                    {"\n"}
                    {"\n"}When you visit our website or interact with our services, we may automatically collect data about your device, such as:
                    {"\n"}
                    {"\n"}Additionally, if you encounter certain errors while using the site, we may automatically collect data about the error and the circumstances surrounding its occurrence. This data may include technical details about your device, what you were trying to do when the error happened, and other technical information relating to the problem. You may or may not receive notice of such errors, even in the moment they occur, that they have occurred, or what the nature of the error is.
                    {"\n"}
                    {"\n"}Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.
                    {"\n"}
                    {"\n"}Device Data
                    {"\n"}
                    {"\n"}When you visit our website or interact with our services, we may automatically collect data about your device, such as:
                    {"\n"}
                    {"\n"}1. Device Type
                    {"\n"}
                    {"\n"}2. Operating System
                    {"\n"}
                    {"\n"}3. Unique device identifiers
                    {"\n"}
                    {"\n"}4. Device settings
                    {"\n"}
                    {"\n"}5. Geo-location data
                    {"\n"}
                    {"\n"}Data we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.
                    {"\n"}
                    {"\n"}Personal Information
                    {"\n"}
                    {"\n"}We may ask for personal information which may include one or more of the following:
                    {"\n"}
                    {"\n"}1. Name
                    {"\n"}
                    {"\n"}2. Email
                    {"\n"}
                    {"\n"}3. Social media profiles
                    {"\n"}
                    {"\n"}4. Date of birth
                    {"\n"}
                    {"\n"}5. Phone/mobile number
                    {"\n"}
                    {"\n"}6. Home/mailing address
                    {"\n"}
                    {"\n"}Legitimate Reasons for Processing Your Personal Information
                    {"\n"}
                    {"\n"}We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.
                    {"\n"}
                    {"\n"}Collection and Use of Information
                    {"\n"}
                    {"\n"}We may collect personal information from you when you do any of the following on our website:
                    {"\n"}
                    {"\n"}1. Register for an account
                    {"\n"}
                    {"\n"}2. Sign up to receive updates from us via email or social media channels
                    {"\n"}
                    {"\n"}3. Use a mobile device or web browser to access our content
                    {"\n"}
                    {"\n"}4. Contact us via email, social media, or on any similar technologies
                    {"\n"}
                    {"\n"}5. When you mention us on social media
                    {"\n"}
                    {"\n"}We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
                    {"\n"}
                    {"\n"}1. to provide you with our platform's core features and services
                    {"\n"}
                    {"\n"}2. to contact and communicate with you
                    {"\n"}
                    {"\n"}3. for analytics, market research, and business development, including to operate and improve our website, associated applications, and associated social media platforms
                    {"\n"}
                    {"\n"}4. for advertising and marketing, including to send you promotional information about our products and services and information about third parties that we consider may be of interest to you
                    {"\n"}
                    {"\n"}5. to enable you to access and use our website, associated applications, and associated social media platforms
                    {"\n"}
                    {"\n"}6. for internal record keeping and administrative purposes
                    {"\n"}
                    {"\n"}Please be aware that we may combine information we collect about you with general information or research data we receive from other trusted sources.
                    {"\n"}
                    {"\n"}Security of Your Personal Information
                    {"\n"}
                    {"\n"}When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
                    {"\n"}
                    {"\n"}Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach.
                    {"\n"}
                    {"\n"}You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services.
                    {"\n"}
                    {"\n"}How Long We Keep Your Personal Information
                    {"\n"}
                    {"\n"}We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you.
                    {"\n"}
                    {"\n"}However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Children’s Privacy</Text>
                <Text numberOfLines={100}>
                    {"\n"}We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Disclosure of Personal Information to Third Parties</Text>
                <Text numberOfLines={100}>
                    {"\n"}We may disclose personal information to:
                    {"\n"}
                    {"\n"}1. a parent, subsidiary, or affiliate of our company
                    {"\n"}
                    {"\n"}2. third party service providers for the purpose of enabling them to provide their services, for example, IT service providers, data storage, hosting and server providers, advertisers, or analytics platforms
                    {"\n"}
                    {"\n"}3. our employees, contractors, and/or related entities
                    {"\n"}
                    {"\n"}4. our existing or potential agents or business partners
                    {"\n"}
                    {"\n"}5. courts, tribunals, regulatory authorities, and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise, or defend our legal rights
                    {"\n"}
                    {"\n"}6. third parties, including agents or sub-contractors, who assist us in providing information, products, services, or direct marketing to you
                    {"\n"}
                    {"\n"}7. third parties to collect and process data
                </Text>
                <Text style={styles.header}>{"\n"}International Transfers of Personal Information</Text>
                <Text numberOfLines={100}>
                    {"\n"}The personal information we collect is stored and/or processed in , or where we or our partners, affiliates, and third-party providers maintain facilities.
                    {"\n"}
                    {"\n"}The countries to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Your Rights and Controlling Your Personal Information</Text>
                <Text numberOfLines={100}>
                    {"\n"}You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you.
                    {"\n"}
                    {"\n"}If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.
                    {"\n"}
                    {"\n"}If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity.
                    {"\n"}
                    {"\n"}If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.
                    {"\n"}
                    {"\n"}If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Use of Cookies</Text>
                <Text numberOfLines={100}>
                    {"\n"}We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.
                    {"\n"}
                    {"\n"}Please refer to our Cookie Policy for more information.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Limits of Our Policy</Text>
                <Text numberOfLines={100}>
                    {"\n"}Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Changes to This Policy</Text>
                <Text numberOfLines={100}>
                    {"\n"}At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy.
                    {"\n"}
                    {"\n"}If the changes are significant, or if required by applicable law, we will contact you (based on your selected preferences for communications from us) and all our registered users with the new details and links to the updated or changed policy.
                    {"\n"}
                    {"\n"}If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Contact Us</Text>
                <Text numberOfLines={100}>
                    {"\n"}For any questions or concerns regarding your privacy, you may contact us using the following details:
                    {"\n"}
                    {"\n"}Noelle Frieson
                    {"\n"}
                    {"\n"}info@recareercenter.com
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Terms of Service</Text>
                <Text numberOfLines={100}>
                    {"\n"}These Terms of Service govern your use of the website located at https://recareercenter.com and any related services provided by Center For Real Estate Education.
                    {"\n"}
                    {"\n"}By accessing https://recareercenter.com, and CFREE Real Estate Exam Prep App you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or accessing this website or using any other services provided by Center For Real Estate Education.
                    {"\n"}
                    {"\n"}We, Center For Real Estate Education, reserve the right to review and amend any of these Terms of Service at our sole discretion. Upon doing so, we will update this page. Any changes to these Terms of Service will take effect immediately from the date of publication.
                    {"\n"}
                    {"\n"}These Terms of Service were last updated on 30 September 2021.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Limitations of Use</Text>
                <Text numberOfLines={100}>
                    {"\n"}By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not:
                    {"\n"}
                    {"\n"}1. modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website;
                    {"\n"}
                    {"\n"}2. remove any copyright or other proprietary notations from any materials and software on this website;
                    {"\n"}
                    {"\n"}3. transfer the materials to another person or “mirror” the materials on any other server;
                    {"\n"}
                    {"\n"}4. knowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or any other service Center For Real Estate Education provides;
                    {"\n"}
                    {"\n"}5. use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material;
                    {"\n"}
                    {"\n"}6. use this website or its associated services in violation of any applicable laws or regulations;
                    {"\n"}
                    {"\n"}7. use this website in conjunction with sending unauthorized advertising or spam;
                    {"\n"}
                    {"\n"}8. harvest, collect, or gather user data without the user’s consent;
                    {"\n"}
                    {"\n"}9. use this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Intellectual Property</Text>
                <Text numberOfLines={100}>
                    {"\n"}The intellectual property in the materials contained in this website are owned by or licensed to Center For Real Estate Education and are protected by applicable copyright and trademark law. We grant our users permission to download one copy of the materials for personal, non-commercial transitory use.
                    {"\n"}
                    {"\n"}This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms of Service, and may be terminated by Center For Real Estate Education at any time.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Liability</Text>
                <Text numberOfLines={100}>
                    {"\n"}Our website and the materials on our website are provided on an 'as is' basis. To the extent permitted by law, Center For Real Estate Education makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights.
                    {"\n"}
                    {"\n"}In no event shall Center For Real Estate Education or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use this website or the materials on this website, even if Center For Real Estate Education or an authorized representative has been notified, orally or in writing, of the possibility of such damage.
                    {"\n"}
                    {"\n"}In the context of this agreement, “consequential loss” includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity, or otherwise.
                    {"\n"}
                    {"\n"}Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Accuracy of Materials</Text>
                <Text numberOfLines={100}>
                    {"\n"}The materials appearing on our website are not comprehensive and are for general information purposes only. Center For Real Estate Education does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website, or otherwise relating to such materials or on any resources linked to this website.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Links</Text>
                <Text numberOfLines={100}>
                    {"\n"}Center For Real Estate Education has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval, or control by Center For Real Estate Education of the site. Use of any such linked site is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Right to Terminate</Text>
                <Text numberOfLines={100}>
                    {"\n"}We may suspend or terminate your right to use our website and terminate these Terms of Service immediately upon written notice to you for any breach of these Terms of Service.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Severance</Text>
                <Text numberOfLines={100}>
                    {"\n"}Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected.
                    {"\n"}
                </Text>
                <Text style={styles.header}>{"\n"}Governing Law</Text>
                <Text numberOfLines={100}>
                    {"\n"}These Terms of Service are governed by and construed in accordance with the laws of New Jersey. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    {"\n"}
                    {"\n"}
                    {"\n"}
                    {"\n"}
                    {"\n"}
                </Text>
            </ScrollView>
        </>
    );
};

export default TermsPage;
