# 🧠 NeuroNet Exchange

A blockchain-based decentralized marketplace for AI datasets and models, enabling secure, fair, and transparent data sharing, annotation, licensing, and model deployment using Clarity smart contracts.

---

## **Overview**

NeuroNet Exchange enables data creators, annotators, and model developers to collaborate in a tokenized ecosystem where contributions are tracked, compensated, and transparently managed on-chain.

This system consists of **nine core smart contracts** that govern various components of the decentralized AI data economy:

1. **Dataset Registry Contract** – Tokenizes and registers datasets
2. **Data Licensing Contract** – Issues access licenses and manages usage rights
3. **Annotator Reward Contract** – Incentivizes and pays human labelers
4. **Model Registry Contract** – Registers trained AI models on-chain
5. **Model Licensing Contract** – Governs the sale, rental, or royalty-based use of models
6. **Reputation Oracle Contract** – Tracks and rates data/model contributors
7. **Dispute Resolution Contract** – Resolves licensing or contribution conflicts
8. **Revenue Sharing Contract** – Automates profit distribution based on contribution
9. **Governance Contract** – Enables DAO-based protocol upgrades and decisions

---

## **Features**

- Tokenized datasets and models (NFT-based)
- Fair compensation for data labeling and model training
- On-chain licensing with auditability
- Transparent data lineage and provenance
- Usage-based royalty tracking and distribution
- Community governance via DAO
- Dispute resolution with verifiable proofs

---

## **Smart Contracts**

### **Dataset Registry Contract**
- Mint dataset NFTs with metadata and IPFS/Arweave links
- Register ownership and contributor attribution
- Tag datasets by domain, quality, format

### **Data Licensing Contract**
- Issue time-limited or perpetual licenses
- Manage terms of access and permitted usage
- Verify license status before dataset access

### **Annotator Reward Contract**
- Register annotation tasks with reward pools
- Verify submissions via DAO or oracle
- Distribute STX or custom token rewards to labelers

### **Model Registry Contract**
- Tokenize machine learning models
- Track model inputs, training datasets, and contributors
- Support versioning and fork history

### **Model Licensing Contract**
- Rent, sell, or license models to users or dApps
- Enable on-chain inference tracking (for off-chain execution validation)
- Auto-enforce royalties to contributors

### **Reputation Oracle Contract**
- Aggregate reputation scores for users
- Weight votes, access, and reward eligibility
- Sybil resistance through staking or identity linkage

### **Dispute Resolution Contract**
- File and resolve disputes over IP, usage, or rewards
- Multi-sig or DAO arbitration support
- Enforce decisions programmatically

### **Revenue Sharing Contract**
- Split payments or royalties among contributors
- Support weighted distributions (e.g., 60% to dataset owner, 30% to annotators, 10% to model developer)
- Update shares with DAO consensus

### **Governance Contract**
- Propose and vote on upgrades, parameters, new datasets
- STX or governance token-based voting
- DAO treasury management

---

## **Installation**

```bash
1. Install Clarinet CLI: https://docs.stacks.co/docs/clarity/overview/
2. Clone this repository
3. Run tests:
   npm install
   npm test
4. Deploy contracts:
   clarinet deploy
```

---

## **Usage**

Each contract can be deployed independently and plugged into dApps that require access to AI datasets or models.
Refer to individual contract documentation for ABI methods, example transactions, and integration instructions.

## **Testing**

Tests are written using Vitest and simulate common user flows:

```bash
npm test
```

## **License**

MIT License