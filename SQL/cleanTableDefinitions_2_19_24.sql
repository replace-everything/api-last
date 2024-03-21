CREATE TABLE `PQ_adjusters` (
  `adid` int(11) NOT NULL AUTO_INCREMENT,
  `adgid` int(11) NOT NULL,
  `adname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ademail` varchar(72) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `adphone` varchar(14) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `adagency` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `adtype` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `adactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `adkey` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`adid`) USING BTREE,
  KEY `inid` (`adid`) USING BTREE
)

CREATE TABLE `PQ_adjustersAgency` (
  `agid` int(11) NOT NULL AUTO_INCREMENT,
  `agname` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `agview` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`agid`) USING BTREE,
  KEY `agid` (`agid`) USING BTREE
)

CREATE TABLE `PQ_building` (
  `bid` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `badate` date DEFAULT NULL,
  `bedate` date DEFAULT NULL,
  `blid` int(8) DEFAULT NULL COMMENT `location id`,
  `bcid` int(8) DEFAULT NULL COMMENT `customer id`,
  `bmid` int(8) DEFAULT NULL COMMENT `management company id`,
  `bcontact` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcontactphone` bigint(10) DEFAULT NULL,
  `bcontactemail` varchar(75) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcontact2` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcontactphone2` bigint(10) DEFAULT NULL,
  `bcontactemail2` varchar(75) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `btype` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `comercial, residential`,
  `bsector` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bsize` int(8) DEFAULT NULL,
  `bfloors` int(2) DEFAULT NULL COMMENT `required`,
  `blayers` int(2) DEFAULT NULL COMMENT `layers`,
  `bpitch` float DEFAULT NULL COMMENT `pitch`,
  `broof` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `flat, piched`,
  `broofmat` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bmaterial` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `metal, rubber, shingle`,
  `bmaterial2` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bmaterial3` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bhatch` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `yes/no`,
  `bheight` int(2) DEFAULT NULL COMMENT `height of floors`,
  `bbheight` int(5) DEFAULT NULL,
  `bsys` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bmfr` int(6) DEFAULT NULL,
  `bmil` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bwar` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `binstall` date DEFAULT NULL,
  `blastserv` date DEFAULT NULL,
  `bnextserv` date DEFAULT NULL,
  `blastrep` date DEFAULT NULL,
  `bnextrep` date DEFAULT NULL,
  `bname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bnum` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bsame` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `baddr1` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `baddr2` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcity` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bst` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bzip` int(9) unsigned DEFAULT NULL,
  `blatlon` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcnt` varchar(42) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcntemail` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bcntphone` bigint(10) DEFAULT NULL,
  `bview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE KEY `bid` (`bid`),
  KEY `blid` (`blid`),
  KEY `bcid` (`bcid`),
  KEY `bmid` (`bmid`),
  KEY `bmfr` (`bmfr`)
)

CREATE TABLE `PQ_calculator` (
  `caid` int(8) NOT NULL AUTO_INCREMENT,
  `caname` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `shinglecostbundle` double(8,2) DEFAULT 0.00,
  `underlaymentcostbundle` double(8,2) DEFAULT 0.00,
  `icewatercost` double(8,2) DEFAULT 0.00,
  `hipridgecost` double(8,2) DEFAULT 0.00,
  `startershinglecost` double(8,2) DEFAULT 0.00,
  `nailcost` double(8,2) DEFAULT 0.00,
  `staplecost` double(8,2) DEFAULT 0.00,
  `ventingcost` double(8,2) DEFAULT 0.00,
  `caactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT `Yes`,
  PRIMARY KEY (`caid`),
  KEY `caid` (`caid`)
)

CREATE TABLE `PQ_client` (
  `cid` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `cuid` int(6) unsigned DEFAULT NULL,
  `cadate` date DEFAULT NULL,
  `cedate` date DEFAULT NULL,
  `ctype` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cstatus` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `clientstatus` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `clientsubstatus` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cismgmt` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ccomp` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `caddr1` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `caddr2` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ccity` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cst` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `czip` int(9) unsigned DEFAULT NULL,
  `cphone` bigint(10) DEFAULT NULL,
  `cphonebilling` bigint(10) DEFAULT NULL,
  `caltphone` bigint(10) DEFAULT NULL,
  `csmsphone` bigint(10) DEFAULT NULL,
  `cext` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cfax` bigint(10) DEFAULT NULL,
  `ccontact` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ctitle` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemail` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailAlt` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailAlt2` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailAlt3` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailAlt4` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailAlt5` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailAlt6` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ccontact2` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ctitle2` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cphone2` bigint(10) DEFAULT NULL,
  `cext2` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemail2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemail2cc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cemailbilling` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `caltemailbilling` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `curl` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cpayterms` varchar(124) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT `Upon Receipt`,
  `cview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `csalesid` int(4) DEFAULT NULL,
  `creferral` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cwon` date DEFAULT NULL,
  `clost` date DEFAULT NULL,
  `cqbid` int(6) DEFAULT NULL,
  `cqbresp` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `clatefee` double(3,1) DEFAULT NULL,
  `cwaivelate` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `clotid` int(8) DEFAULT NULL,
  `cinid` int(8) DEFAULT NULL,
  `capp` tinyint(1) DEFAULT NULL,
  `cinvpays` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cstatus2` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cstatusuid` int(8) DEFAULT NULL,
  `cstatusreason` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cstatusdate` datetime DEFAULT NULL,
  `clatlon` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cnnote` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cinspection` date DEFAULT NULL,
  `clastcontact` datetime DEFAULT NULL,
  `clastcontactuid` int(8) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `cid` (`cid`),
  KEY `csalesid` (`csalesid`),
  KEY `cuid` (`cuid`)
)

CREATE TABLE `PQ_clientStatement` (
  `csid` int(8) NOT NULL AUTO_INCREMENT,
  `cscid` int(8) NOT NULL,
  `csuid` int(6) NOT NULL,
  `cskey` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `csdtsemail` datetime DEFAULT NULL,
  `csdtsview` datetime DEFAULT NULL,
  PRIMARY KEY (`csid`),
  KEY `cscid` (`cscid`),
  KEY `csuid` (`csuid`)
)

CREATE TABLE `PQ_co` (
  `coid` int(6) NOT NULL AUTO_INCREMENT,
  `coapplyto` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `colicense1` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `colicense2` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `colicense3` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `colicense4` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coaddr1` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coaddr2` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cocity` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `costate` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cozip` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cophone1` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cophone2` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coemail` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cofax` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `courl` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cstatus` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cstatusmaster` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cservices` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `csector` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coins` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `comatloc` int(8) DEFAULT NULL,
  `colatlon` varchar(35) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cologo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `coresdue` int(3) DEFAULT 7,
  `cocomdue` int(3) DEFAULT 30,
  `colaterate` double(4,2) DEFAULT 0.00,
  `coinnotecom` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coinnoteres` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cointerms` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coincontingency` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coeula` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coeulaversion` double(4,2) DEFAULT NULL,
  `cocctoken` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coreviewlink` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coreviewtext` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coexpdaysres` int(3) DEFAULT NULL,
  `coexpdayscom` int(3) DEFAULT NULL,
  `cosalesgoal` int(8) DEFAULT NULL,
  `cosalesgoaly` int(8) DEFAULT NULL,
  `cotimezone` varchar(35) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cocheckout` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`coid`)
)

CREATE TABLE `PQ_coms` (
  `comid` int(8) NOT NULL AUTO_INCREMENT,
  `comlid` int(8) DEFAULT NULL,
  `comsalesid` int(8) DEFAULT NULL,
  `comdts` datetime DEFAULT NULL,
  `comkey` varchar(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `comurl` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `comshow` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`comid`),
  KEY `comid` (`comid`)
)

CREATE TABLE `PQ_contingency` (
  `ctid` int(8) NOT NULL AUTO_INCREMENT,
  `ctlid` int(8) DEFAULT NULL,
  `ctcid` int(8) DEFAULT NULL,
  `ctinid` int(8) DEFAULT NULL,
  `ctjid` int(8) DEFAULT NULL,
  `ctstatus` tinyint(1) DEFAULT NULL,
  `ctdts` datetime DEFAULT NULL,
  `ctname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ctip` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ctipxfrom` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ctlatlon` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ctua` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ctid`),
  KEY `ctid` (`ctid`)
)

CREATE TABLE `PQ_crewRates` (
  `crid` int(6) NOT NULL AUTO_INCREMENT,
  `cruid` int(6) DEFAULT NULL,
  `crwotype` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crdata` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`crid`),
  KEY `crid` (`crid`)
)

CREATE TABLE `PQ_crm` (
  `crmid` bigint(9) NOT NULL AUTO_INCREMENT,
  `crmname` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmaddr1` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmaddr2` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmcity` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmstate` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmzip` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmemail` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmphone` varchar(14) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmphonealt` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmweb` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT `Yes`,
  `crmtags` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmcat` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`crmid`),
  KEY `crmid` (`crmid`)
)

CREATE TABLE `PQ_crmNames` (
  `crmnid` bigint(9) NOT NULL AUTO_INCREMENT,
  `crmncrmid` bigint(9) DEFAULT NULL,
  `crmnname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmnemail` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `crmnphone` varchar(14) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`crmnid`),
  KEY `crmnid` (`crmnid`)
)

CREATE TABLE `PQ_deficiency` (
  `dfid` int(4) NOT NULL AUTO_INCREMENT,
  `dfcat` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dfname` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dfdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dfcorrect` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dfunit` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dfcost` double(10,2) DEFAULT 0.00,
  PRIMARY KEY (`dfid`)
)

CREATE TABLE `PQ_emailTriggers` (
  `eid` int(4) NOT NULL AUTO_INCREMENT,
  `elabel` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `erecip` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`eid`)
)

CREATE TABLE `PQ_eula` (
  `eulaid` bigint(8) NOT NULL AUTO_INCREMENT,
  `eulaver` double(4,2) DEFAULT NULL,
  `eulatext` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `euladts` datetime DEFAULT NULL,
  PRIMARY KEY (`eulaid`),
  KEY `eulaid` (`eulaid`)
)

CREATE TABLE `PQ_eulaSig` (
  `eulasid` int(8) NOT NULL AUTO_INCREMENT,
  `eulasuid` bigint(9) DEFAULT NULL,
  `eulasversion` double(4,2) DEFAULT NULL,
  `eulassig` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `eulasdts` datetime DEFAULT NULL,
  PRIMARY KEY (`eulasid`) USING BTREE,
  KEY `eulaid` (`eulasid`) USING BTREE
)

CREATE TABLE `PQ_events` (
  `eid` int(10) NOT NULL AUTO_INCREMENT,
  `euid` int(6) DEFAULT NULL,
  `ejid` int(10) DEFAULT NULL,
  `ecid` int(10) DEFAULT NULL,
  `elid` int(10) DEFAULT NULL,
  `elocid` int(10) DEFAULT NULL,
  `etype` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `estartdts` datetime DEFAULT NULL,
  `eenddts` datetime DEFAULT NULL,
  `eallday` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `etitle` varchar(84) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `edesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `estatus` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `eauid` int(6) DEFAULT NULL,
  `eadts` datetime DEFAULT NULL,
  `eduration` int(3) DEFAULT NULL COMMENT `duration of the event in minutes`,
  `edurationtyp` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `notify_emails` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `notify_names` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`eid`),
  KEY `euid` (`euid`),
  KEY `ejid` (`ejid`),
  KEY `eauid` (`eauid`)
)

CREATE TABLE `PQ_inspections` (
  `inid` int(8) NOT NULL AUTO_INCREMENT,
  `inlid` int(8) DEFAULT NULL,
  `inbid` int(8) DEFAULT NULL,
  `incid` int(8) DEFAULT NULL,
  `injid` int(8) DEFAULT NULL,
  `inlotid` int(8) DEFAULT NULL,
  `indts` datetime DEFAULT NULL,
  `incomsalesid` int(8) DEFAULT NULL,
  `incomdts` datetime DEFAULT NULL,
  `incomkey` varchar(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `incomshow` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `insimpleinspections` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inservices` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inprojectidcc` bigint(9) DEFAULT NULL,
  `inurlappcc` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inurlpubcc` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inurlprojcc` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`inid`),
  KEY `inid` (`inid`)
)

CREATE TABLE `PQ_insuranceClaims` (
  `icid` int(8) NOT NULL AUTO_INCREMENT,
  `icjid` int(8) DEFAULT NULL,
  `icaid` int(8) DEFAULT NULL,
  `icadid` int(8) DEFAULT NULL,
  `icuid` int(8) DEFAULT NULL,
  `icstatus` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `icdts` date DEFAULT NULL,
  `iclossdts` date DEFAULT NULL,
  `icdiscdts` date DEFAULT NULL,
  `icadjsched` date DEFAULT NULL,
  `icclaimnum` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `icpolicynum` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `icinsuranceco` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `icamount` double(10,2) DEFAULT NULL,
  `icamountdts` date DEFAULT NULL,
  `icamountworking` double(10,2) DEFAULT NULL,
  `icsimpleinspections` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `icadjatt` tinyint(1) DEFAULT NULL,
  `iccovsumrec` tinyint(1) DEFAULT NULL,
  `icinsupsub` tinyint(1) DEFAULT NULL,
  `icsufcovapp` tinyint(1) DEFAULT NULL,
  `icdenied` tinyint(1) DEFAULT NULL,
  `icprojectidcc` bigint(9) DEFAULT NULL,
  `icurlappcc` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `irurlpubcc` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`icid`),
  KEY `icid` (`icid`)
)

CREATE TABLE `PQ_insuranceClause` (
  `icid` int(1) NOT NULL,
  `icclause` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
)

CREATE TABLE `PQ_insuranceCo` (
  `inid` int(11) NOT NULL AUTO_INCREMENT,
  `inname` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inphone` varchar(14) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inemail` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`inid`) USING BTREE,
  KEY `inid` (`inid`) USING BTREE
)

CREATE TABLE `PQ_insuranceContacts` (
  `incid` int(8) NOT NULL AUTO_INCREMENT,
  `incinid` int(8) DEFAULT NULL,
  `inctype` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `incname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `incphone` varchar(14) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `incemail` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `incactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT `Yes`,
  PRIMARY KEY (`incid`),
  KEY `incid` (`incid`)
)

CREATE TABLE `PQ_integrationsHover` (
  `ihid` int(8) NOT NULL AUTO_INCREMENT,
  `ihjid` int(8) DEFAULT NULL,
  `ihwoid` int(8) DEFAULT NULL,
  `ihwotype` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ihuid` int(8) DEFAULT NULL,
  `ihdts` datetime DEFAULT NULL,
  `ihresponsedts` datetime DEFAULT NULL,
  `ihpayload` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ihresponse` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`ihid`),
  KEY `ihid` (`ihid`)
)

CREATE TABLE `PQ_invoice` (
  `invid` int(8) NOT NULL AUTO_INCREMENT,
  `invcid` int(8) DEFAULT NULL,
  `invjid` int(8) DEFAULT 0,
  `invjrid` int(8) DEFAULT NULL,
  `invuid` int(8) DEFAULT NULL,
  `invdate` date DEFAULT NULL,
  `invdatedue` date DEFAULT NULL,
  `invsent` date DEFAULT NULL,
  `invopen` date DEFAULT NULL,
  `invaccept` date DEFAULT NULL,
  `invstatus` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invtype` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invtotal` double(10,2) DEFAULT NULL,
  `invkey` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invreason` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invcommuid` int(6) DEFAULT NULL,
  `invcommtot` double(6,2) DEFAULT NULL,
  `invcommdts` date DEFAULT NULL,
  `invcommtot2` double(6,2) DEFAULT NULL,
  `invcommdts2` date DEFAULT NULL,
  `iqbid` int(10) DEFAULT NULL,
  `iqbstat` int(1) DEFAULT 0,
  `iqbinvoicenum` varchar(21) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `iqbresp` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `iqbitem` varchar(144) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invnolate` tinyint(1) DEFAULT NULL,
  `invpaidfull` date DEFAULT NULL,
  `invlatefee` double(6,2) DEFAULT 0.00,
  `invpaid` double(8,2) DEFAULT 0.00,
  `invpays` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invpaysid` int(4) DEFAULT NULL,
  `invpaystatus` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `invtm` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`invid`),
  KEY `invuid` (`invuid`),
  KEY `invjrid` (`invjrid`),
  KEY `invjid` (`invjid`),
  KEY `invcommuid` (`invcommuid`),
  KEY `invcid` (`invcid`)
)

CREATE TABLE `PQ_invoiceNote` (
  `inid` int(1) NOT NULL,
  `innote` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
)

CREATE TABLE `PQ_invoicePayments` (
  `ipid` int(8) NOT NULL AUTO_INCREMENT,
  `ipcid` int(8) DEFAULT NULL,
  `ipjid` int(8) DEFAULT NULL,
  `ipjrid` int(8) DEFAULT NULL,
  `ipuid` int(6) DEFAULT NULL,
  `ipdate` date DEFAULT NULL,
  `ipamt` double(10,2) DEFAULT 0.00,
  `ipfee` double(10,2) DEFAULT 0.00,
  `iptype` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipmeth` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipchknum` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipqbid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipqbresp` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipccpayload` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipccresponse` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ipid`),
  KEY `payuid` (`ipuid`),
  KEY `ipjrid` (`ipjrid`),
  KEY `ipjid` (`ipjid`),
  KEY `ipcid` (`ipcid`)
)

CREATE TABLE `PQ_invoicePaymentsDeclines` (
  `ipdid` int(8) NOT NULL AUTO_INCREMENT,
  `ipdinvid` int(8) DEFAULT NULL,
  `ipddts` datetime DEFAULT NULL,
  `ipdpayload` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ipdresult` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`ipdid`),
  KEY `ipdid` (`ipdid`)
)

CREATE TABLE `PQ_invoicePaymentsPending` (
  `ipid` int(8) NOT NULL AUTO_INCREMENT,
  `ipcid` int(8) DEFAULT NULL,
  `ipjid` int(8) DEFAULT NULL,
  `ipjrid` int(8) DEFAULT NULL,
  `ipuid` int(6) DEFAULT NULL,
  `ipdate` date DEFAULT NULL,
  `ipamt` double(10,2) DEFAULT 0.00,
  `ipfee` double(10,2) DEFAULT 0.00,
  `iptype` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipmeth` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipchknum` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipqbid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipqbresp` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipccpayload` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ipccresponse` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ipid`),
  KEY `payuid` (`ipuid`),
  KEY `ipjrid` (`ipjrid`),
  KEY `ipjid` (`ipjid`),
  KEY `ipcid` (`ipcid`)
)

CREATE TABLE `PQ_job` (
  `jid` int(8) NOT NULL AUTO_INCREMENT,
  `jcontid` int(8) NOT NULL,
  `jcid` int(8) DEFAULT NULL,
  `jlid` int(8) DEFAULT NULL,
  `jbid` int(8) DEFAULT NULL,
  `juid` int(8) DEFAULT NULL,
  `jouid` int(8) DEFAULT NULL,
  `jauid` int(8) DEFAULT NULL,
  `jpmgr` int(8) DEFAULT NULL,
  `jadate` datetime DEFAULT NULL,
  `jstatus` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `qstatus` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jsched` date DEFAULT NULL,
  `jtype` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jsector` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jwork` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jprefdate` date DEFAULT NULL,
  `jodeldts` datetime DEFAULT NULL,
  `jodumpsterco` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jodumpsterdate` date DEFAULT NULL,
  `jopermit` date DEFAULT NULL,
  `joinspection` date DEFAULT NULL,
  `jinstaller` int(8) DEFAULT NULL,
  `jinstallon` date DEFAULT NULL,
  `jinstalldate` date DEFAULT NULL,
  `jinstalldesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jinsurance` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jinsuranceco` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jinsuranceadj` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jinsuranceadjphone` bigint(10) DEFAULT NULL,
  `jinsuranceadjemail` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jpublicadj` int(4) DEFAULT NULL,
  `jorigcoverage` decimal(10,2) DEFAULT NULL,
  `jclaimnum` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jwarranty` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jservice` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jreason` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jreasonuid` int(9) DEFAULT NULL,
  `jreasondts` datetime DEFAULT NULL,
  `jlink` int(8) DEFAULT NULL,
  `jcopiedfrom` int(8) DEFAULT NULL,
  `jmailed` int(1) DEFAULT 0,
  `jstarted` date DEFAULT NULL,
  `jfinished` date DEFAULT NULL,
  `jeta` date DEFAULT NULL,
  `jsubmitted` datetime DEFAULT NULL,
  `jkey` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrate` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jratenotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jcontact` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jcontactphone` bigint(10) DEFAULT NULL,
  `jwoct` int(2) DEFAULT 0,
  `jlotid` int(6) DEFAULT NULL,
  `jqnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jwarr` tinyint(1) DEFAULT NULL,
  `jwarrid` int(8) DEFAULT NULL,
  PRIMARY KEY (`jid`),
  KEY `jcid` (`jcid`),
  KEY `jlid` (`jlid`),
  KEY `jbid` (`jbid`),
  KEY `juid` (`juid`),
  KEY `jauid` (`jauid`),
  KEY `jouid` (`jouid`),
  KEY `jinsuranceadj` (`jpublicadj`) USING BTREE,
  KEY `jcontid` (`jcontid`)
)

CREATE TABLE `PQ_jobCost` (
  `jcostid` int(10) NOT NULL AUTO_INCREMENT,
  `jcjid` int(10) NOT NULL DEFAULT 0,
  `jcjrid` int(10) DEFAULT NULL,
  `jcuid` int(10) DEFAULT NULL,
  `jcdts` datetime DEFAULT NULL,
  `jcmatordered` double(8,2) DEFAULT NULL,
  `jcshopmat` double(8,2) DEFAULT NULL,
  `jcdisposal` double(8,2) DEFAULT NULL,
  `jcmiscmater` double(8,2) DEFAULT NULL,
  `jcpermit` double(8,2) DEFAULT NULL,
  `jceagleview` double(8,2) DEFAULT NULL,
  `jcsublabor` double(8,2) DEFAULT NULL,
  `jcexpense` double(8,2) DEFAULT NULL,
  `jcextras` double(8,2) DEFAULT NULL,
  `jctotalcost` double(8,2) DEFAULT NULL,
  `jcreturns` double(8,2) DEFAULT NULL,
  `jcmarketing` double(8,2) DEFAULT NULL,
  `jcleadfee` double(8,2) DEFAULT NULL,
  `jcfinalcost` double(8,2) DEFAULT NULL,
  `jcnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jcmisc` double(6,2) DEFAULT NULL,
  `jcdone` tinyint(1) DEFAULT NULL,
  `jcwarrcost` double(6,2) DEFAULT NULL,
  `jccommpayout` double(6,2) DEFAULT NULL,
  PRIMARY KEY (`jcostid`),
  KEY `jrpjrid` (`jcjrid`),
  KEY `jcuid` (`jcuid`),
  KEY `jcjid` (`jcjid`)
)

CREATE TABLE `PQ_jobHours` (
  `jhid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `jhjid` int(8) DEFAULT NULL COMMENT `PQ_job.jid`,
  `jhuid` int(6) DEFAULT NULL COMMENT `Selected user ID`,
  `jhwoid` int(8) DEFAULT NULL COMMENT `Work Order ID`,
  `jhhours` double(4,2) DEFAULT NULL COMMENT `Selected user hours`,
  `jhdate` date DEFAULT NULL COMMENT `Date hours apply to (for all selected users)`,
  `jhstart` datetime DEFAULT NULL,
  `jhend` datetime DEFAULT NULL,
  `jhuser` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `ufirstn + ulastn of user entering hours (to avoid double user table lookup)`,
  `jhrate` double(5,2) DEFAULT NULL,
  `jhdts` datetime DEFAULT NULL COMMENT `NOW() when hours are entered`,
  `jhcb` tinyint(1) DEFAULT NULL,
  `jhac` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`jhid`),
  KEY `jhjid` (`jhjid`),
  KEY `jhuid` (`jhuid`),
  KEY `jhwoid` (`jhwoid`)
)

CREATE TABLE `PQ_jobOrder` (
  `psid` int(10) NOT NULL AUTO_INCREMENT,
  `pstype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `psmarket` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pscat` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pstitle` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `psdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `psqty` double(10,2) DEFAULT 0.00,
  `psqtytype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pstemplate` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pscost` float(10,2) DEFAULT 0.00,
  `psview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`psid`)
)

CREATE TABLE `PQ_jobOrderMfrs` (
  `mid` int(4) NOT NULL AUTO_INCREMENT,
  `mfr` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `maddr1` varchar(75) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mcity` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mstate` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mzip` int(9) DEFAULT NULL,
  `mphone` bigint(10) DEFAULT NULL,
  `memail` varchar(75) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mid`)
)

CREATE TABLE `PQ_jobOrderPhotos` (
  `jrpid` int(10) NOT NULL AUTO_INCREMENT,
  `jrpjrid` int(10) DEFAULT NULL,
  `jrpwoid` int(8) DEFAULT NULL,
  `jrptype` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrporder` int(3) DEFAULT 0,
  `jrplabel` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpdetail` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpstyle` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpcolor` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpmfr` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpfilename` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpunits` float DEFAULT 0,
  `jrpunittype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpunitcost` double(10,2) DEFAULT 0.00,
  `jrpcost` double(10,2) DEFAULT 0.00,
  `jrppub` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpdisp` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpinst` int(1) DEFAULT 0,
  `jrpttype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`jrpid`),
  KEY `jrpjrid` (`jrpjrid`),
  KEY `jrpwoid` (`jrpwoid`)
)

CREATE TABLE `PQ_jobReport` (
  `jrid` int(10) NOT NULL AUTO_INCREMENT,
  `jrjid` int(10) DEFAULT NULL,
  `jrtype` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jruid` int(6) DEFAULT NULL,
  `jrdate` date DEFAULT NULL,
  `jrexpire` date DEFAULT NULL,
  `jrinsclause` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrwarr` int(6) DEFAULT NULL,
  `jrwarr2` int(6) DEFAULT NULL,
  `jrnote` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrterms` varchar(124) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrtotalcost` double(10,2) DEFAULT 0.00,
  `jrdepreq` double(10,2) DEFAULT 0.00,
  `jronote` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jroedts` datetime DEFAULT NULL,
  `jrqty` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`jrid`),
  KEY `jrjid` (`jrjid`),
  KEY `jruid` (`jruid`)
)

CREATE TABLE `PQ_jobReportIDX` (
  `jriid` int(10) NOT NULL AUTO_INCREMENT,
  `jrijrid` int(10) DEFAULT NULL,
  `jritem` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jricost` double(10,2) DEFAULT 0.00,
  PRIMARY KEY (`jriid`),
  KEY `jrijrid` (`jrijrid`)
)

CREATE TABLE `PQ_jobReportPhotos` (
  `jrpid` int(10) NOT NULL AUTO_INCREMENT,
  `jrpjrid` int(10) DEFAULT NULL,
  `jrptype` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrporder` int(3) DEFAULT 0,
  `jrplabel` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpdetail` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpmapparams` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpmapcenter` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpfilename` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpgrade` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpunits` int(6) DEFAULT 0,
  `jrpunittype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpunitcost` double(10,2) DEFAULT 0.00,
  `jrpcost` double(10,2) DEFAULT 0.00,
  `jrppub` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrppubcost` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpdisp` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpcopy` int(6) DEFAULT NULL,
  `jrpusequotefile` tinyint(1) DEFAULT 1,
  `jrpuseclaimfile` tinyint(1) DEFAULT NULL,
  `jrpusewofile` int(8) DEFAULT NULL,
  `jrpdate` date DEFAULT NULL,
  `jrpphotoidcc` bigint(10) DEFAULT NULL,
  `jrpphotodtscc` bigint(15) DEFAULT NULL,
  `jrpdts` datetime DEFAULT NULL,
  `jrpaccept` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `jrpinitials` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`jrpid`),
  KEY `jrpjrid` (`jrpjrid`)
)

CREATE TABLE `PQ_knowledgebase` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `article` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cat` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `sticky` tinyint(1) DEFAULT 0,
  `imgurl` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `vidurl` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `custonly` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `custexclude` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `PQ_log` (
  `logid` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `logcat` varchar(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `logtitle` varchar(48) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `loguid` int(6) DEFAULT NULL,
  `logdts` datetime DEFAULT NULL,
  `logdataid` int(10) DEFAULT NULL,
  `logaltdataid` int(10) DEFAULT NULL,
  `lognote` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`logid`),
  KEY `loguid` (`loguid`),
  KEY `logdataid` (`logdataid`)
)

CREATE TABLE `PQ_lot` (
  `lotid` int(6) NOT NULL DEFAULT 0,
  `lotname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotaddress1` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotaddress2` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotcity` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotstate` char(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotzip` varchar(9) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotphone` bigint(10) DEFAULT NULL,
  `lotemail` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotlogo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lothdr` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lotview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT `Yes`,
  `lotcctoken` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`lotid`)
)

CREATE TABLE `PQ_masterAccounts` (
  `maid` int(8) NOT NULL AUTO_INCREMENT,
  `maco` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `maname` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `maaddr1` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `maaddr2` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `macity` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mastate` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mazip` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `maphone` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `madenyaccess` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`maid`),
  KEY `maid` (`maid`)
)

CREATE TABLE `PQ_materials` (
  `mid` int(8) NOT NULL AUTO_INCREMENT,
  `mtype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mmarket` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mcat` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mtitle` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mqty` double(10,2) DEFAULT 0.00,
  `mqtytype` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mtemplate` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mcost` float(10,2) DEFAULT 0.00,
  `mservice` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mid`) USING BTREE
)

CREATE TABLE `PQ_materialsIDX` (
  `miid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `miorder` int(4) unsigned NOT NULL DEFAULT 0,
  `mimid` int(8) DEFAULT NULL,
  `mimfr` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mistyle` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `micolor` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `micost` float(10,2) DEFAULT 0.00,
  `mionhand` int(9) DEFAULT 0,
  `mihide` tinyint(1) DEFAULT NULL,
  `misys` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`miid`),
  KEY `miid` (`miid`)
)

CREATE TABLE `PQ_materialsList` (
  `mlid` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `mlcoid` int(2) DEFAULT NULL,
  `mljid` bigint(10) unsigned DEFAULT NULL,
  `mlwoid` int(8) DEFAULT NULL,
  `mlwo` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlsid` int(10) DEFAULT NULL,
  `mlsgid` int(4) DEFAULT NULL,
  `mlitemorder` int(3) DEFAULT NULL,
  `mlstatus` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlstatusreason` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlordertype` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlcreator` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlcreatorid` int(6) DEFAULT NULL,
  `mlcreated` date DEFAULT NULL,
  `mlorder` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlorderid` int(6) DEFAULT NULL,
  `mlordered` date DEFAULT NULL,
  `mlcancel` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlcancelid` int(6) DEFAULT NULL,
  `mlcancelled` date DEFAULT NULL,
  `mldroploc` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mldropwhid` int(6) DEFAULT NULL,
  `mldropeta` date DEFAULT NULL,
  `mlreceive` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlreceived` date DEFAULT NULL,
  `mlproduction` date DEFAULT NULL,
  `mlrstatus` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlrnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlrproblem` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlcalltosched` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlrpic` int(1) DEFAULT NULL,
  `mlassign` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlassigndts` datetime DEFAULT NULL,
  `mlassignid` int(6) DEFAULT NULL,
  `mlassignby` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlassignbyid` int(6) DEFAULT NULL,
  `mlfix` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlfixid` int(6) DEFAULT NULL,
  `mlfixed` date DEFAULT NULL,
  `mlnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlintnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlorderdelivfee` double(7,2) DEFAULT 0.00,
  `mlordertot` double(7,2) DEFAULT 0.00,
  `mlcredit` double(7,2) DEFAULT 0.00,
  `mlkey` varchar(248) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlacl` varchar(248) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlseen` date DEFAULT NULL,
  `mlseencancel` date DEFAULT NULL,
  `mlid2` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mlid`),
  KEY `mljid` (`mljid`),
  KEY `mlwoid` (`mlwoid`),
  KEY `mlsgid` (`mlsgid`),
  KEY `mlsuid` (`mlsid`) USING BTREE,
  KEY `mlcoid` (`mlcoid`)
)

CREATE TABLE `PQ_materialsListFiles` (
  `mlfid` int(10) NOT NULL AUTO_INCREMENT,
  `mlfmlid` int(10) NOT NULL DEFAULT 0,
  `mlfuid` int(10) NOT NULL DEFAULT 0,
  `mlfname` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`mlfid`) USING BTREE,
  KEY `id` (`mlfid`) USING BTREE
)

CREATE TABLE `PQ_materialsListIDX` (
  `mliid` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `mlimlid` bigint(10) unsigned DEFAULT NULL,
  `mlimid` int(8) DEFAULT NULL,
  `mlimiid` int(8) DEFAULT NULL,
  `mliordered` int(4) DEFAULT 0,
  `mlipulled` int(4) DEFAULT 0,
  `mlireceived` int(4) DEFAULT NULL,
  `mlicost` double(7,2) DEFAULT 0.00,
  `mlireturned` int(4) DEFAULT NULL,
  `mliopt` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mliid`) USING BTREE,
  KEY `mlimlid` (`mlimlid`),
  KEY `mlimid` (`mlimid`),
  KEY `mlimiid` (`mlimiid`)
)

CREATE TABLE `PQ_materialsListPhotos` (
  `mlpicid` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `mlpicmlid` bigint(10) unsigned DEFAULT NULL,
  `mlpicfilename` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlpicext` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlpicdts` datetime DEFAULT NULL,
  `mlpo` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mlpicid`) USING BTREE,
  KEY `mlpicmlid` (`mlpicmlid`)
)

CREATE TABLE `PQ_materialsListTemplate` (
  `mltid` int(6) NOT NULL AUTO_INCREMENT,
  `mltntid` int(8) DEFAULT NULL,
  `mltsid` int(6) DEFAULT NULL,
  `mltname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mlttype` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltmap` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltmarket` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltservice` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltorder` int(3) DEFAULT NULL,
  `mltview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mltid`)
)

CREATE TABLE `PQ_materialsListTemplateIDX` (
  `mltiid` int(8) NOT NULL AUTO_INCREMENT,
  `mltimltid` int(6) DEFAULT NULL,
  `mltimid` int(8) DEFAULT NULL,
  `mlticalcvarid` int(8) DEFAULT NULL,
  `mltimap` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltcoverage` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mltorder` int(2) DEFAULT NULL,
  PRIMARY KEY (`mltiid`) USING BTREE,
  KEY `mltmid` (`mltimltid`) USING BTREE
)

CREATE TABLE `PQ_materialsMFR` (
  `mid` int(4) NOT NULL AUTO_INCREMENT,
  `mfr` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mid`) USING BTREE
)

CREATE TABLE `PQ_materialsPhotos` (
  `mpid` int(8) NOT NULL AUTO_INCREMENT,
  `mpmid` bigint(10) unsigned DEFAULT NULL,
  `mplabel` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mpfn` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mpid`) USING BTREE,
  KEY `mlpmid` (`mpmid`) USING BTREE
)

CREATE TABLE `PQ_materialsPricing` (
  `mpid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mpmiid` int(10) unsigned NOT NULL,
  `mpmid` int(8) NOT NULL,
  `mpgid` int(4) NOT NULL,
  `mpsku` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `mpcost` double(6,2) DEFAULT 0.00,
  `mpdts` date DEFAULT NULL,
  `mpuid` int(6) DEFAULT NULL,
  `mpactive` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`mpid`)
)

CREATE TABLE `PQ_messageTemplatesNew` (
  `mtid` int(8) NOT NULL AUTO_INCREMENT,
  `mttype` varchar(8) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT ``,
  `mtname` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mttrigger` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mttarget` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mttriggertype` varchar(8) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtdelivery` varchar(8) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtsubjectemail` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtmsgemail` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtrecipemail` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtrecipemailcc` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtrecipemailbcc` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtmsgsms` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtrecipsms` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mttags` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtreciptags` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtactive` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtattachments` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`mtid`),
  KEY `mtid` (`mtid`)
)

CREATE TABLE `PQ_messageTracking` (
  `mtid` int(8) NOT NULL AUTO_INCREMENT,
  `mtjid` int(8) DEFAULT NULL,
  `mtwoid` int(8) DEFAULT NULL,
  `mttype` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtmessageid` varchar(72) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtuser` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtdts` datetime DEFAULT NULL,
  `mtstatus` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `mtresult` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`mtid`),
  KEY `mtid` (`mtid`)
)

CREATE TABLE `PQ_messages` (
  `msgid` int(8) NOT NULL AUTO_INCREMENT,
  `msguid` int(8) DEFAULT NULL,
  `mailgunid` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `msgrecip` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `msgaltrecip` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `msgsubject` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `msgstatus` varchar(12) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `msgsentdts` datetime DEFAULT NULL,
  `msgdelivdts` datetime DEFAULT NULL,
  PRIMARY KEY (`msgid`),
  KEY `msgid` (`msgid`)
)

CREATE TABLE `PQ_newTemplates` (
  `ntid` int(10) NOT NULL AUTO_INCREMENT,
  `nttype` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ntmarket` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ntwotype` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ntcat` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `nttitle` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ntview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ntaccess` int(7) DEFAULT NULL,
  `ntdetail` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ntlineitems` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ntid`)
)

CREATE TABLE `PQ_notes` (
  `nid` bigint(9) NOT NULL AUTO_INCREMENT,
  `njid` bigint(9) DEFAULT NULL,
  `njcontid` bigint(9) DEFAULT NULL,
  `nwoid` bigint(9) DEFAULT NULL,
  `nuid` bigint(9) DEFAULT NULL,
  `nicid` bigint(9) DEFAULT NULL,
  `ncid` bigint(9) DEFAULT NULL,
  `ncat` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ndate` datetime DEFAULT NULL,
  `nfollowup` date DEFAULT NULL,
  `nfollowedup` tinyint(1) DEFAULT 0,
  `nnote` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`nid`),
  KEY `nid` (`nid`)
)

CREATE TABLE `PQ_photos` (
  `photoid` bigint(10) NOT NULL AUTO_INCREMENT,
  `pjobid` int(8) DEFAULT NULL,
  `pwoid` int(8) DEFAULT NULL,
  `pwotype` text DEFAULT NULL,
  `puser` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `photoname` int(6) DEFAULT NULL,
  `photoext` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `photodts` datetime DEFAULT NULL,
  `photolabel` varchar(155) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phototags` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `photoorder` int(3) DEFAULT 0,
  `photoidcc` bigint(10) DEFAULT NULL,
  `photodtscc` bigint(15) DEFAULT NULL,
  `photoreq` varchar(155) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `photonotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`photoid`),
  KEY `pjobid` (`pjobid`),
  KEY `pwoid` (`pwoid`)
)

CREATE TABLE `PQ_photosChecklist` (
  `pcid` int(8) NOT NULL AUTO_INCREMENT,
  `pcwotype` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pcwowtypes` varchar(155) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pcname` varchar(155) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pcdata` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`pcid`),
  KEY `pcid` (`pcid`)
)

CREATE TABLE `PQ_photosChecklistIDX` (
  `pciid` int(8) NOT NULL AUTO_INCREMENT,
  `pcipcid` int(8) DEFAULT NULL,
  `pciwoid` int(8) DEFAULT NULL,
  `pcireq` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`pciid`),
  KEY `pciid` (`pciid`)
)

CREATE TABLE `PQ_photosIDX` (
  `pidxid` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `pidxjobid` int(8) unsigned DEFAULT NULL,
  `pidxphotoid` bigint(10) unsigned DEFAULT NULL,
  `pidxptype` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `pidxorder` int(3) unsigned DEFAULT 0,
  PRIMARY KEY (`pidxid`),
  KEY `pidxphotoid` (`pidxphotoid`),
  KEY `pidxjobid` (`pidxjobid`)
)

CREATE TABLE `PQ_quoteCalculator` (
  `qcid` int(8) NOT NULL AUTO_INCREMENT,
  `qcjid` int(8) DEFAULT NULL,
  `qccosts` int(7) DEFAULT NULL,
  `qcmarkup` int(7) DEFAULT NULL,
  `qcdata` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`qcid`),
  KEY `qcid` (`qcid`)
)

CREATE TABLE `PQ_reportUser` (
  `ruid` int(10) NOT NULL AUTO_INCREMENT,
  `rurid` int(6) DEFAULT NULL COMMENT `Report Id`,
  `ruuid` int(6) DEFAULT NULL COMMENT `User Id`,
  PRIMARY KEY (`ruid`),
  KEY `rurid` (`rurid`) USING HASH,
  KEY `ruuid` (`ruuid`) USING HASH
)

CREATE TABLE `PQ_reports` (
  `rid` int(6) NOT NULL AUTO_INCREMENT,
  `rname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `rdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `raccess` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `rdealer` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `rstatus` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `rcat` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `rfilephp` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`rid`)
)

CREATE TABLE `PQ_reportsAuto` (
  `raid` int(8) NOT NULL AUTO_INCREMENT,
  `raname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `rafile` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `raactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `rarecipients` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`raid`),
  KEY `raid` (`raid`)
)

CREATE TABLE `PQ_signatures` (
  `sjid` int(10) DEFAULT NULL,
  `sdts` datetime DEFAULT NULL,
  `sname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sip` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sipxfrom` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `slatlon` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sua` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `internal` int(1) DEFAULT NULL
)

CREATE TABLE `PQ_smsTemplates` (
  `smsid` int(8) NOT NULL AUTO_INCREMENT,
  `smsname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `smsmsg` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `smsplacement` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `smsactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`smsid`),
  KEY `smsid` (`smsid`)
)

CREATE TABLE `PQ_source` (
  `sid` int(4) NOT NULL AUTO_INCREMENT,
  `source` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`sid`)
)

CREATE TABLE `PQ_supplementals` (
  `suid` int(8) NOT NULL AUTO_INCREMENT,
  `suicid` int(8) DEFAULT NULL,
  `suuid` int(8) DEFAULT NULL,
  `suamountreq` decimal(10,2) DEFAULT NULL,
  `suamountapp` decimal(10,2) DEFAULT NULL,
  `sustatus` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sudatereq` datetime DEFAULT NULL,
  `sudate` datetime DEFAULT NULL,
  `sunotes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`suid`),
  KEY `suid` (`suid`)
)

CREATE TABLE `PQ_suppliers` (
  `suid` int(10) NOT NULL AUTO_INCREMENT,
  `sugid` int(4) NOT NULL,
  `suname` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suaddress1` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suaddress2` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sucity` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sustate` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suzip` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sucontact` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suphone` bigint(10) DEFAULT NULL,
  `suemail` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sualtemail` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suuid` int(9) DEFAULT NULL,
  `suadded` datetime NOT NULL,
  `suactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sunotes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suaccnum` varchar(24) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `suinventory` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sulatlon` varchar(24) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sudelivfee` double(4,2) DEFAULT NULL,
  `susalestax` double(4,2) DEFAULT NULL,
  PRIMARY KEY (`suid`),
  KEY `suid` (`suid`),
  KEY `sgid` (`sugid`) USING BTREE
)

CREATE TABLE `PQ_suppliersGroups` (
  `gid` int(4) NOT NULL AUTO_INCREMENT,
  `gname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gcode` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gsalesrep` varchar(75) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gsalesrepphone` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gsalesrepemail` varchar(75) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gconpricing` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gconexp` date DEFAULT NULL,
  `gaccnum` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ginventory` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`gid`),
  KEY `gname` (`gname`)
)

CREATE TABLE `PQ_taskNotes` (
  `tnid` bigint(9) NOT NULL AUTO_INCREMENT,
  `tntid` bigint(9) DEFAULT NULL,
  `tnuid` bigint(9) DEFAULT NULL,
  `tndate` datetime DEFAULT NULL,
  `tnnote` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`tnid`),
  KEY `nid` (`tnid`)
)

CREATE TABLE `PQ_tasks` (
  `tid` int(8) NOT NULL AUTO_INCREMENT,
  `tjid` int(8) DEFAULT NULL,
  `twoid` int(8) DEFAULT NULL,
  `tuid` int(8) DEFAULT NULL,
  `tassuid` int(8) DEFAULT NULL,
  `ticid` int(8) DEFAULT NULL,
  `tdts` date DEFAULT NULL,
  `tdeadlinedts` date DEFAULT NULL,
  `tdeadlinetime` time DEFAULT NULL,
  `topeneddts` datetime DEFAULT NULL,
  `tcompdts` date DEFAULT NULL,
  `tcat` varchar(16) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `tstatus` varchar(16) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `tpriority` varchar(16) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `tsummary` varchar(48) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `tdetails` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `treason` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `tid` (`tid`)
)

CREATE TABLE `PQ_templ` (
  `tid` int(9) NOT NULL AUTO_INCREMENT,
  `tname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ttext` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `tid` (`tid`)
)

CREATE TABLE `PQ_urlShort` (
  `urlid` int(8) NOT NULL AUTO_INCREMENT,
  `urlcode` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `urllong` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `urlexpires` datetime DEFAULT NULL,
  `urlview` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`urlid`),
  KEY `urlid` (`urlid`)
)

CREATE TABLE `PQ_user` (
  `uid` int(6) NOT NULL AUTO_INCREMENT COMMENT `User ID`,
  `ulogin` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Login`,
  `upass` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Password`,
  `ufirstn` varchar(48) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `First Name`,
  `ulastn` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Last Name`,
  `uemail` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Email`,
  `uphone` bigint(20) DEFAULT NULL COMMENT `Phone`,
  `uphonemobile` bigint(20) DEFAULT NULL,
  `uadddts` datetime DEFAULT NULL COMMENT `Add Date Time`,
  `uaddid` int(6) DEFAULT NULL COMMENT `Add User`,
  `ueditdts` datetime DEFAULT NULL COMMENT `Edit Date Time`,
  `ueditid` int(6) DEFAULT NULL COMMENT `Edit User`,
  `ulastlogin` datetime DEFAULT NULL,
  `ulastdts` datetime DEFAULT NULL COMMENT `Last Login Success Datetime`,
  `ulastpassdts` datetime DEFAULT NULL,
  `urole` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Role`,
  `uestimate` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Estimates`,
  `uclients` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ujobs` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uinstaller` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `utemplates` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `usuper` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Super User (Yes/No)`,
  `ustatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT `Status (Enabled/Disabled)`,
  `uexpire` int(8) DEFAULT 0 COMMENT `Session Expiry`,
  `utitl` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `usys` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ulock` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `umenuoverride` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ucid` int(11) DEFAULT 1 COMMENT `company id`,
  `uaddpart` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uaddpartrate` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `udefLot` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ucntE` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ucolor` varchar(7) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ukey` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uperms` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ustart` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ustartmobile` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ufieldRe` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uroles` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `urolesBKUP` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uassign` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uwidgets` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `urate` double(5,2) DEFAULT NULL,
  `ulang` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uintegrationcc` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ucompanies` varchar(84) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `uservices` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `usalesgoal` int(7) DEFAULT NULL,
  `usalesgoaly` bigint(9) DEFAULT NULL,
  `ustagingaccess` tinyint(1) DEFAULT NULL,
  `umasteraccess` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `uaddid` (`uaddid`),
  KEY `ueditid` (`ueditid`)
)

CREATE TABLE `PQ_warehouses` (
  `whid` int(6) NOT NULL AUTO_INCREMENT,
  `whname` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whaddress1` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whaddress2` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whcity` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whstate` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whzip` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whcontact` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whphone` bigint(10) DEFAULT NULL,
  `whemail` varchar(70) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whuid` int(9) DEFAULT NULL,
  `whadded` datetime NOT NULL,
  `whactive` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `whnotes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`whid`),
  KEY `whid` (`whid`)
)

CREATE TABLE `PQ_warehousesINV` (
  `whiid` int(9) NOT NULL AUTO_INCREMENT,
  `whiwhid` int(9) DEFAULT NULL,
  `whimid` int(9) DEFAULT NULL,
  `whimiid` int(9) DEFAULT NULL,
  `whionhand` int(9) DEFAULT NULL,
  `whicost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`whiid`),
  KEY `whiid` (`whiid`)
)

CREATE TABLE `PQ_warranty` (
  `wid` int(6) NOT NULL AUTO_INCREMENT,
  `wtitle` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wlterm` int(2) DEFAULT 0,
  `wmterm` int(2) DEFAULT 0,
  `wdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wview` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`wid`)
)

CREATE TABLE `PQ_woCheckins` (
  `chid` int(9) NOT NULL AUTO_INCREMENT,
  `chjid` int(9) DEFAULT NULL,
  `chwoid` int(9) DEFAULT NULL,
  `chuid` int(9) DEFAULT NULL,
  `chdate` datetime DEFAULT NULL,
  `chdatein` datetime DEFAULT NULL,
  `chdateout` datetime DEFAULT NULL,
  `chcrewuids` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`chid`),
  KEY `chid` (`chid`)
)

CREATE TABLE `PQ_woRoof` (
  `wojid` int(11) DEFAULT NULL,
  `wonotes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wostatus` varchar(8) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
)

CREATE TABLE `PQ_workOrderInspect` (
  `woiid` bigint(9) NOT NULL AUTO_INCREMENT,
  `woijid` bigint(9) DEFAULT NULL,
  `woiwoid` bigint(9) DEFAULT NULL,
  `woiuid` bigint(9) DEFAULT NULL,
  `woiassignor` bigint(9) DEFAULT NULL,
  `woiassigndate` date DEFAULT NULL,
  `woiinspdate` date DEFAULT NULL,
  `woieta` datetime DEFAULT NULL,
  `woiresdate` datetime DEFAULT NULL,
  `woiresnote` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `woicbnote` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `woistatus` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `woicsosig` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `woicsosigdts` datetime DEFAULT NULL,
  `woicsosenddts` datetime DEFAULT NULL,
  `woicsoip` varchar(55) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `woicsolatlon` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `woicsokey` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`woiid`),
  KEY `woiid` (`woiid`)
)

CREATE TABLE `PQ_workOrderInspectPhotos` (
  `woipicid` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `woipicwoid` bigint(10) unsigned DEFAULT NULL,
  `woipicfilename` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woipicext` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woipicdts` datetime DEFAULT NULL,
  `woipo` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`woipicid`) USING BTREE,
  KEY `woDBSUPERIORROOpicwoid` (`woipicwoid`)
)

CREATE TABLE `PQ_workOrders` (
  `woid` int(8) NOT NULL AUTO_INCREMENT,
  `wojid` int(8) DEFAULT NULL,
  `wotype` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinstaller` int(8) DEFAULT NULL,
  `woassignor` int(8) DEFAULT NULL,
  `wowtype` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wostatus` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wostatususer` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wostatusdate` date DEFAULT NULL,
  `wostatusreason` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woeta` date DEFAULT NULL,
  `wostart` date DEFAULT NULL,
  `wofinish` date DEFAULT NULL,
  `wofinishdts` datetime DEFAULT NULL,
  `wofinishdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wodeldts` date DEFAULT NULL,
  `wopermit` date DEFAULT NULL,
  `wopermitnum` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wopermitreq` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinspection` datetime DEFAULT NULL,
  `woinspectionlabel` varchar(26) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinspection2` datetime DEFAULT NULL,
  `woinspection2label` varchar(26) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinspectreq` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wodumpsterdate` date DEFAULT NULL,
  `wodumpsterco` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wonotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinstallernotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `worate` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woratenotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinsp` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinspassignor` int(9) DEFAULT NULL,
  `woinspassigndate` date DEFAULT NULL,
  `woinspuid` int(9) DEFAULT NULL,
  `woinspprob` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinspdesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `woinspdate` date DEFAULT NULL,
  `woview` tinyint(1) DEFAULT 1,
  `wokey` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wocsosig` varchar(75) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wocsosigdts` datetime DEFAULT NULL,
  `wocsosenddts` datetime DEFAULT NULL,
  `wocsoip` varchar(55) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wocsolatlon` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wocsokey` varchar(35) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`woid`),
  KEY `woinstaller` (`woinstaller`),
  KEY `wojid` (`wojid`)
)

CREATE TABLE `PQ_workOrdersWorksheets` (
  `wsid` int(9) NOT NULL AUTO_INCREMENT,
  `wswotype` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wsform` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`wsid`),
  KEY `wsid` (`wsid`)
)

CREATE TABLE `PQ_workOrdersWorksheetsData` (
  `wsdid` int(9) NOT NULL AUTO_INCREMENT,
  `wsdwsid` int(9) DEFAULT NULL,
  `wsdwoid` int(9) DEFAULT NULL,
  `wsdform` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wsdformBKUP` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`wsdid`),
  KEY `wsdid` (`wsdid`)
)

CREATE TABLE `api_auth` (
  `authid` int(4) NOT NULL AUTO_INCREMENT,
  `authuser` varchar(42) DEFAULT NULL,
  `authsecret` varchar(128) DEFAULT NULL,
  `authtoken` varchar(128) DEFAULT NULL,
  `authtokenexpire` datetime DEFAULT NULL,
  `authip` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`authid`)
)

CREATE TABLE `api_example` (
  `exampleid` int(4) NOT NULL AUTO_INCREMENT,
  `exampledate` date DEFAULT NULL,
  `exampledata` varchar(24) DEFAULT NULL,
  KEY `exampleid` (`exampleid`)
)

CREATE TABLE `iMP_co` (
  `id` int(1) DEFAULT NULL,
  `defirate` int(1) DEFAULT NULL,
  `qbat` text DEFAULT NULL COMMENT `quick books access token`,
  `qbrt` varchar(72) DEFAULT NULL COMMENT `quick books refresh token`,
  `qbrid` varchar(72) DEFAULT NULL,
  `qbtokendts` datetime DEFAULT NULL,
  `rateA` double(4,2) DEFAULT 0.00,
  `rateC` double(4,2) DEFAULT 0.00,
  `rateE` double(4,2) DEFAULT 0.00,
  `hdrinvA` text DEFAULT NULL,
  `hdrinvB` text DEFAULT NULL,
  `prodemail` varchar(75) DEFAULT NULL,
  `salesgoal` int(7) DEFAULT NULL,
  `salesgoaly` bigint(9) DEFAULT NULL,
  `csalesgoal` int(7) DEFAULT NULL,
  `csalesgoaly` bigint(9) DEFAULT NULL,
  `reviewlink` text DEFAULT NULL,
  `autochkout` time DEFAULT `23:59:00`,
  `chkoutremind` time DEFAULT `20:00:00`,
  `chkoutremindlim` int(2) DEFAULT 3,
  `chkoutremindint` int(3) DEFAULT 60,
  `settings_account` text DEFAULT NULL,
  `settings_payments` text DEFAULT NULL,
  `settings_roles` text DEFAULT NULL
)

CREATE TABLE `iMP_cp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cid` smallint(3) DEFAULT NULL,
  `cpuid` smallint(4) DEFAULT NULL,
  `euid` smallint(4) DEFAULT NULL,
  `edate` date DEFAULT NULL,
  `xdate` date DEFAULT NULL,
  `cptype` varchar(9) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpcomm` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpname` varchar(124) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpweb` varchar(248) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpnotes` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpuse` char(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cplead` varchar(4) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpview` char(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpyr` year(4) DEFAULT NULL,
  `cpo` smallint(5) DEFAULT NULL,
  `cpl` smallint(5) DEFAULT NULL,
  `cpt` smallint(5) DEFAULT NULL,
  `cpf` varchar(48) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpm` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpshow` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cptaxexempt` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT `No`,
  `cptaxid` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpcode` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  KEY `euid` (`euid`),
  KEY `cpuid` (`cpuid`)
)

CREATE TABLE `iMP_lotM` (
  `lid` tinyint(2) NOT NULL AUTO_INCREMENT,
  `cid` smallint(3) DEFAULT NULL,
  `labbr` varchar(12) DEFAULT NULL,
  `lname` varchar(60) DEFAULT NULL,
  `laddress1` varchar(60) DEFAULT NULL,
  `laddress2` varchar(60) DEFAULT NULL,
  `lcity` varchar(36) DEFAULT NULL,
  `lstate` char(2) DEFAULT NULL,
  `lzip` varchar(9) DEFAULT NULL,
  `lphone` bigint(10) DEFAULT NULL,
  `lsms` bigint(10) DEFAULT NULL,
  `lfax` bigint(10) DEFAULT NULL,
  `lnotes` text DEFAULT NULL,
  `lcnt` varchar(40) DEFAULT NULL,
  `lemail` varchar(60) DEFAULT NULL,
  `lweb` varchar(60) DEFAULT NULL,
  `lwebname` varchar(60) DEFAULT NULL,
  `lview` varchar(3) DEFAULT `Yes`,
  `ltaxlabor` double(4,2) DEFAULT 0.00,
  `ltaxparts` double(4,2) DEFAULT 0.00,
  `lcntparts` text DEFAULT NULL,
  `lcntshop` text DEFAULT NULL,
  `lparts` varchar(3) DEFAULT NULL,
  `lshop` varchar(3) DEFAULT NULL,
  `lpartsemail` varchar(120) DEFAULT NULL,
  `lcreditemail` varchar(120) DEFAULT NULL,
  `lserviceemail` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`lid`)
)