import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { CONTACT } from "@/constants/contact";
import portAgencyHero from "@/assets/port-agency.jpg";

const TermsOfService = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[350px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${portAgencyHero})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-shoham-navy/80" />
        
        {/* Content */}
        <div className="container-shoham relative z-10 text-white">
          <Link to="/about-us" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to About Us
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Standard Trading Conditions for Shoham Shipping & Logistics
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-shoham">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div className="prose prose-lg max-w-4xl mx-auto prose-headings:text-shoham-navy prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-shoham-navy">
              
              <p className="lead text-lg text-gray-600 mb-8">
                <strong>CYPRUS SHIPPING ASSOCIATION (CSA) RECOMMENDED STANDARD TRADING CONDITIONS</strong>
              </p>
              
              <p>
                All transactions entered into by Shoham (Cyprus) Ltd (hereinafter "the Company") in connection with or arising out of the Company's business as a port agent or liner agent or booking agent or cargo handling agent shall be subject to the following terms and conditions unless otherwise agreed or stated by the Company in writing.
              </p>

              <h2>1. Definitions</h2>
              <p>In these conditions the following expressions have the following meanings:</p>
              <ul>
                <li><strong>"Supplier"</strong> means the company firm or person, organization or other competent Authority, who contracts through the Company to supply services or goods to the Principal or Merchant.</li>
                <li><strong>"Merchant"</strong> means the company firm or person who ships, receives, owns or forwards goods in respect of which the Company, whether as agent or principal, has agreed to provide or procure services.</li>
                <li><strong>"Principal"</strong> means the company firm or person who has or whose representatives have instructed the Company and is the owner or charterer or manager of the vessel represented by the Company and/or the carrier under the bill of lading in connection with which services are provided by the Company.</li>
                <li><strong>"Forwarding Services"</strong> means those services usually provided or arranged by a freight forwarder including the carriage of goods to the port of loading and from the port of discharge, the storage, packing or consolidation of goods, the stuffing and stripping of containers and the customs clearance of goods.</li>
                <li><strong>"Cargo Handling Services"</strong> means the services provided or arranged by the Company in respect with the handling of cargo including loading and discharging, transport, lashing/unlashing, slinging/unslinging, storage, stuffing and stripping of containers and any other related or connected cargo-handling activities.</li>
                <li><strong>"Cargo Booking Services"</strong> means those services provided or arranged by the Company in respect with the booking of cargo on vessels including providing information on vessels and schedules, the solicitation of cargo, the canvassing for cargoes, freight quotations and negotiations as to any cargo transport agreements with Merchants and any other related activities.</li>
              </ul>

              <h2>Transactions with the Supplier</h2>
              <p>The following terms and conditions shall apply to transactions with the Supplier:</p>

              <h3>2.</h3>
              <p>Unless otherwise stated in writing, when the Company is acting as a port agent or liner agent or booking agent it acts at all times as agent for and on behalf of the Principal and has authority to bind the Principal into contracts with the Supplier. The Company shall not be personally liable to pay any debt due to the Supplier from the Principal.</p>

              <h3>3.</h3>
              <p>Where the Company is acting as a forwarding agent, cargo handling agent or cargo booking agent, unless it is acting as agent for the Principal in accordance with clause 2 hereof or otherwise agrees in writing, it acts at all times as agent for and in behalf of the Merchant and has authority to bind the Merchant into contacts with the Supplier. The Company shall not be personally liable to pay any debt due from the Merchant.</p>

              <h2>Transactions with the Merchant</h2>
              <p>The following terms and conditions shall apply to transactions with the Merchant:</p>

              <h3>4.</h3>
              <p>When acting as port agent or liner agent or cargo handling agent or cargo booking agent, the Company acts at all times as agent for and on behalf of the Principal and has authority to bind the Principal into contracts with the Merchant. The Company shall not be personally liable to pay any debt due from the Principal.</p>

              <h3>5.</h3>
              <p>Unless otherwise agreed in writing, where the Company is instructed by the Merchant to arrange forwarding services, cargo handling services or cargo booking services, the Company shall act as agent for the Merchant in procuring the requested services from Supplier.</p>

              <h3>6.</h3>
              <p>Where the Company arranges services for the Merchant's goods which are or will be carried in accordance with a contract with the Principal contained in or evidenced by a bill of lading, charter party or other contract of affreightment, all services including cargo handling services or cargo booking services, forwarding services, are arranged by the Company as agent for and on behalf of the Principal. The provision of such services shall be subject to the terms and conditions of the Principal's bill of lading and tariff rules (if any), which may be inspected on request, or other contract between the Principal and the Merchant.</p>

              <h3>7.</h3>
              <p>If the Company agrees in writing that it will be personally responsible for the provision of forwarding services, cargo handling services or cargo booking services, unless otherwise agreed in writing, the Company shall be relieved of any liability for loss or damage if it can establish that such loss or damage resulted from:</p>
              <ol type="a">
                <li>The act or omission of the Merchant or his representative or any other party from whom the Company took charge of the goods;</li>
                <li>Inherent vice of the goods, including improper packing, labelling or addressing (except to the extent that the Company undertook to be responsible therefore);</li>
                <li>Handling, loading, stowage or unloading of the goods by the Merchant or any person acting on his behalf other than the Company;</li>
                <li>Seizure or forfeiture under legal process;</li>
                <li>Riot, civil commotion, strike, lock-out, general or partial stoppage or restraint of labour from whatever cause;</li>
                <li>Any consequence or war, invasion, acts of foreign enemies, hostilities (whether war be declared or not), civil war, rebellion, revolution, insurrection, military or usurped power or confiscation or nationalization or requisition or destruction of or damage to any property or goods by or under the order of any Government or public or local authority;</li>
                <li>Any cause or event which the Company was unable to avoid and the consequences whereof the Company was unable to prevent by the exercise of due diligence.</li>
              </ol>

              <h3>8.</h3>
              <p>Where so requested in writing by the Merchant or his representative, the Company shall enter and/or clear goods through Customs and/or arrange insurance for the goods as agent for the Merchant. The Company shall have authority to appoint agents to perform such services on behalf of the Merchant, and the agents so appointed shall act as the Merchant's agents and not the Company's agents.</p>

              <h3>9.</h3>
              <p>Where the Company agrees to provide or arrange services for the Merchant's goods, the Merchant shall be deemed to have authorised the Company to conclude all and any contracts necessary to provide those services. The Merchant shall reimburse in demand the Company with all taxes, charges or fines whatsoever incurred by the Company as a result of providing or arranging the services, or undertaking any liability in connection with the services, particularly in respect of any bond issued to the Department of Customs and Excise, the Cyprus Ports Authority or any other competent Authority by the Company.</p>

              <h3>10.</h3>
              <p>The Merchant shall declare to the Company full details of goods, which are of a dangerous or damaging nature, including those goods, which are more particularly described in the IMDG Code. Should the Merchant fail to provide such details at the time of contract, the Merchant shall be responsible for all costs and damages arising as a result thereof and the Company shall have the right exercisable in behalf of itself or its Principal to rescind the contract.</p>

              <h3>11.</h3>
              <p>The Company shall not be liable for loss or damage to goods, unless it is advised thereof in writing within three days after the termination of transit and the claim is made in writing within 7 days, alternatively advice is given within 28 days of the commencement of transit and the claim is made in writing within 42 days, provided always that these limits shall not apply if the Merchant can establish that it was not reasonably possible for him to make a claim in writing within the time limit and notice was given within a reasonable time.</p>

              <h2>Transactions with the Principal</h2>
              <p>The following terms and conditions shall apply to transactions with the Principal:</p>

              <h3>12.</h3>
              <p>The Company shall be the principal's agent and shall exercise due care and diligence in performing services for and on behalf of the Principal.</p>

              <h3>13.</h3>
              <p>The Principal shall indemnify the Company in respect of all liabilities incurred by the Company where acting as a port agent or liner agent or booking agent or cargo handling agent or cargo booking agent on the Principal's behalf.</p>

              <h3>14.</h3>
              <p>The Principal shall pay forthwith by telegraphic transfer to the Company's bank account such sum as the Company may request as an advance on port and cargo handling disbursements, which the Company estimate will be incurred whilst the Principal's vessel is in the Company's agency. If the Principal should fail to comply with the Company's request, the Company may at any time give notice of the termination of its agency.</p>

              <h3>15.</h3>
              <p>The Company shall be entitled to deduct from sums held by the Company for the Principal's account any amounts due to the Company from the Principal.</p>

              <h3>16.</h3>
              <p>The liability of the Company to its Principal in respect of any negligent act error or omission committed by the Company its directors or employees shall not exceed the amount of the fees or commission payable by the Principal to the Company in respect of the vessel or shipment involved (whichever is more) which fees or commission shall be deemed earned in any event. Provided always that where the Agent acts prudently all damages sustained by or to the ships gear including containers shall be for the account of the Principal.</p>

              <h3>17.</h3>
              <p>The Company shall not be liable to indemnify the Principal in respect of any contractual fine, penalty or forfeit incurred by the Principal, unless Clause 16 above applies.</p>

              <h3>18.</h3>
              <p>Subject to any written instructions to the contrary the Company shall have authority to appoint agents to perform services on behalf of the Principal, including such services as may be the subject of these conditions, and the agents so appointed shall act as the principal's agents and not the Company's agents.</p>

              <h3>19.</h3>
              <p>Save where otherwise specifically provided herein the provisions to be found in the FONASBA General Agency Agreement (as applicable from time to time) shall apply as between the Company and the Principal. If there is any conflict between the FONASBA General Agency Agreement and this Agreement, this Agreement shall prevail.</p>

              <h2>Liability and Limitations</h2>

              <h3>20.</h3>
              <p>The Company shall perform its duties with a reasonable degree of care, diligence, skill and judgment. In the absence of precise instructions to the contrary or special agreements by the Merchant or the Principal, the Company shall be at liberty in their choice of means to be used to organise and perform the services according to normal business practice.</p>

              <h3>21.</h3>
              <p>The Company shall be relieved of liability for any loss or damage if and to the extent that such loss or damage is caused by:</p>
              <ol type="a">
                <li>Strike, lockout, stoppage or restraint of labour, the consequences of which the Company is unable to avoid by the exercise of reasonable diligence.</li>
                <li>Any cause or event which the Company is unable to avoid and the consequences whereof the Company is unable to prevent by the exercise of reasonable diligence.</li>
              </ol>

              <h3>22.</h3>
              <p>Unless otherwise agreed in writing and in each instance with a maximum as agreed, the liability of the Company to the Merchant shall in all circumstances be limited to the lesser of sums calculated in the following manner:</p>
              <ol type="a">
                <li>Where goods are lost or damaged:
                  <ol type="i">
                    <li>The value of goods lost and damaged or</li>
                    <li>A sum calculated at the rate as agreed per tonne of the gross weight of any goods lost or damaged.</li>
                  </ol>
                </li>
                <li>In all other circumstances:
                  <ol type="i">
                    <li>The value of the goods the subject of the relevant transaction between the Company and the Merchant or</li>
                    <li>A sum calculated at the rate as agreed per tonne of the gross weight of the goods the subject of the transaction.</li>
                  </ol>
                </li>
                <li>In the event that no rate is stated as per clause 22(a)(ii) and 22(b)(ii), then the limits set out in the Hague Visby Rules shall apply.</li>
              </ol>

              <h3>23.</h3>
              <p>For cargo handling and/or stevedoring services the Company in no event shall be liable for an amount in excess of that to which the shipping line/ship owner is able to limit its liability to the shipper or consignee under the terms to the Bill of Lading or to a sum as agreed per tonne of the gross weight of the goods whichever shall be the least. In the event that no rate is stated then the limits set out in the Hague Visby Rules shall apply.</p>

              <h2>General</h2>

              <h3>24.</h3>
              <p>If the Merchant or the Principal, as the case may be, fails to make payment in full of any sums due to the Company on demand or within any period agreed in writing, the Company shall be entitled to recover interest on any sums outstanding at the rate of 9% or such higher or other rate that may from time to time be prescribed by the laws of Cyprus.</p>

              <h3>25.</h3>
              <p>The Company shall not be presumed to examine the correctness of the particulars or the information given by the Merchant or their representatives and/or the authenticity or regularity of the documents furnished by third parties, including but not limited to the authorization of a third party to act on behalf of the Merchant. Such information shall be accepted in good faith.</p>

              <h3>26.</h3>
              <p>The Company shall have a general lien in all goods and documents relating to goods in its possession, custody or control for all sums due at any time from the Principal or the Merchant and/or their representatives and shall be entitled to sell or dispose of such goods or documents as agent for and at the expense of the Principal or the Merchant and apply the proceeds towards the monies due and the expenses or the retention insurance and sale of the goods, the Company shall, upon accounting to the Principal or the Merchant for any balance remaining, be discharged from all ability whatsoever in respect of the goods.</p>

              <h3>27.</h3>
              <p>The Company shall be entitled to retain and be paid all brokerages, commission, allowances and other remuneration, usually retained by or paid to freight forwarders including cargo handling charges.</p>

              <h3>28.</h3>
              <p>The Merchant, the Supplier and the Principal each undertake with the Company that no claim or allegation of any kind shall be made against any of the Company's directors officers or employees (herein collectively called "the Beneficiaries") for any loss damage or delay of whatsoever kind arising or resulting directly or indirectly from any negligent act error or omission of the Beneficiaries in the performance of the services the subject of these conditions. The Beneficiaries shall have the benefit of this undertaking and in entering into this contract the Company, to the extent of this provision, does so not only on its own behalf but also as agent or trustee for the Beneficiaries, who shall to the extent of this clause only be or be deemed to be parties to this contract.</p>

              <h3>29.</h3>
              <p>The Company shall perform the services it undertakes to provide with due dispatch but shall not be liable for any loss or damage arising from any delay which it could not reasonably prevent.</p>

              <h3>30.</h3>
              <p>The Company shall be discharged from all liability whatsoever to the Principal the Supplier or the Merchant unless suit is brought within one year of delivery of the goods or the date when they should have been delivered or of the act or default complained of, whichever is the earlier.</p>

              <h3>31.</h3>
              <p>These conditions shall be subject to Cyprus Law.</p>

              <h3>32.</h3>
              <p>If there is any conflict between the terms set out herein and any other terms and conditions agreed between the parties these Conditions should prevail unless the Company specifically agrees otherwise in writing.</p>

              <h3>33.</h3>
              <p>The Principal and/or Merchant undertake to comply with the provisions of the International Convention for Safe Container (CSC) 1972 relating to the safety of containers. Any damage caused (including bodily harm) by the non-compliance with the said Convention shall render the Company harmless of any responsibility despite any involvement of the Company. With regard to containers the Customs Convention of Container 1972 shall apply under these conditions.</p>

              <h3>34.</h3>
              <p>A Principal or Merchant shall pay to the Company for the services rendered by the Company all amounts as may have been agreed between them by virtue of any agreement concluded, the amounts arising out of the charges as per the official tariffs approved from time to time by the Port Authority as well as all those charges normally or habitually charged by the company for services such as notification fees, bill of lading fees, service fees, agency fees, etc.</p>

              <hr className="my-8" />

              <h2>Contact Us</h2>
              <p>If you have questions about these Terms of Service, please contact us:</p>
              <address className="not-italic">
                <strong>Shoham Shipping & Logistics</strong><br />
                <br />
                Email: <a href={CONTACT.primary.emailHref}>{CONTACT.primary.email}</a><br />
                Phone: <a href={CONTACT.primary.phoneHref}>{CONTACT.primary.phone}</a>
              </address>

              <p className="text-sm text-gray-500 mt-8">
                <em>Last Updated: January 2026</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
