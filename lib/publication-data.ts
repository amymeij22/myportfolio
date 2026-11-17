export interface Publication {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  type: "Jurnal" | "Konferensi";
  publication_date: string;
  doi?: string;
  abstract: string;
  link: string;
  image_url?: string;
  created_at: string;
}

export const fallbackPublications: Publication[] = [
  {
    "id": 17,
    "title": "An Automated Pipeline with WebGIS Dissemination for Operational PET-Based Thermal Comfort Forecasts Across Bali’s Tourism Destinations",
    "authors": [
      "Ahmad Meijlan Yasir",
      "Agustina Rachmawardani",
      "Adi Widiatmoko Wastumirad",
      "Ahmad Fachruddin Rais"
    ],
    "journal": "INSTEK (Informatika Sains dan Teknologi)",
    "type": "Jurnal",
    "publication_date": "2026-10-15",
    "doi": "10.24252/instek.v11i2.71351",
    "abstract": "Outdoor tourism in Bali is exposed to weather conditions, but conventional forecast variables do not directly describe human thermal comfort. This study developed and deployed an automated system that converts BMKG village-level weather forecasts into destination-specific physiological equivalent temperature (PET) information for 49 tourism destinations across 45 villages and urban wards in Bali. The pipeline processes forecasts using the biometeo library, assigns temperate and tropical/subtropical thermal categories, and stores outputs as versioned batches. The WebGIS presents the latest batch through a village-level choropleth map, forecast-time navigation, destination-specific information, selectable PET classifications, a bilingual interface, and update notifications. Evaluation combined unit, black-box, and cross-browser end-to-end testing with a 30-day operational assessment and performance measurements. Of 180 scheduled executions, 179 succeeded (99.4%), with a mean pipeline runtime of 158.4 s and a mean initial WebGIS loading time of 301.3 ms. PET characterisation at five selected destinations showed a peak in mean PET around 13:00 UTC+8 and a generally decreasing, but non-monotonic, tendency with increasing elevation. These patterns are descriptive and do not establish forecast accuracy. Forecast-derived PET was not validated against field observations, and usability and practical usefulness for visitors were not assessed through user studies.",
    "link": "https://doi.org/10.24252/instek.v11i2.71351",
    "created_at": "2026-11-16T15:53:29.86789+00:00"
  },
  {
    "id": 16,
    "title": "Forecasting Particulate Matter Concentration Using Deep Learning and Weather Data",
    "authors": [
      "Ahmad Furqon",
      "Santoso Soekirno",
      "Naufal Ananda",
      "Haryas Subyantara Wicaksana",
      "Ahmad Meijlan Yasir",
      "Tonny Wahyu Aji",
      "Aviv Maghridlo",
      "Fadhli Luthfiansyah",
      "Marzuki Sinambela",
      "Suko Prayitno Adi"
    ],
    "journal": "TELKOMNIKA (Telecommunication Computing Electronics and Control)",
    "type": "Jurnal",
    "publication_date": "2026-10-01",
    "doi": "10.12928/telkomnika.v24i5.27967",
    "abstract": "Particulate matter (PM2.5) concentration is a critical air quality indicator with severe health impacts. Predicting its dynamics is challenging due to complex interactions with meteorological variables. This study evaluates long short-term memory (LSTM) and multilayer perceptron (MLP) networks to identify the most accurate forecasting architecture. We integrated continuous data from automatic weather stations (AWS) and air quality sensors. Data preprocessing involved temporal synchronization, outlier removal, and multivariate imputation by chained equations (MICE). Key input features past particulate matter, temperature, and relative humidity were selected via Pearson correlation and trained using a 24-hour sliding window. Results demonstrate that the single LSTM model outperforms both the MLP and hybrid architectures. The LSTM achieved the lowest root mean square error (RMSE) of 6.862 µg/m³ and a mean absolute percentage error (MAPE) of 37.38%. Although the MLP yielded a slightly higher coefficient of determination (0.810), it exhibited significant magnitude bias by treating sequential data as static features. Ultimately, this research provides a robust, data-driven framework for real-time air quality early warning systems in tropical regions.",
    "link": "https://doi.org/10.12928/telkomnika.v24i5.27967",
    "created_at": "2026-11-16T15:53:29.781926+00:00"
  },
  {
    "id": 14,
    "title": "Design and Evaluation of a Multichannel Information Architecture for PET-Based Thermal Comfort Dissemination in DKI Jakarta",
    "authors": [
      "Ahmad Meijlan Yasir",
      "Marzuki Sinambela",
      "Agustina Rachmawardani"
    ],
    "journal": "Jurnal Info Sains : Informatika dan Sains",
    "type": "Jurnal",
    "publication_date": "2026-07-23",
    "abstract": "Urban heat exposure in tropical megacities has intensified, yet public weather services still communicate conditions as separate meteorological parameters that do not describe the thermal load experienced by the human body. The Physiological Equivalent Temperature (PET) index addresses this limitation, but most PET studies conclude as analyses, maps, or datasets rather than services reaching the public. This study designs and evaluates a multichannel information architecture for delivering PET-based thermal comfort information at subdistrict resolution to the general public in DKI Jakarta. Hourly ECMWF Integrated Forecasting System forecasts were obtained through an open weather data service for 267 subdistricts across 44 districts and six administrative cities, from which mean radiant temperature and PET were computed and classified using a nine-class tropical scheme. The information was organised into three separated nodes in which 2,448 precomputed aggregate records accompany 12,816 hourly subdistrict records, delivered through an interactive dashboard and a scheduled messaging summary. Precomputation adds 9.3 percent to stored payload but reduces the data read to render the aggregate layers from 3,053.2 KB to 5.90 KB, a factor of 518. All twelve functional test scenarios performed as expected, and the mean usability score across twelve respondents reached 85.2, well above the reported average. Separating aggregation levels and pairing a pull channel with a push channel makes high resolution thermal comfort information navigable for non-expert users.",
    "link": "https://ejournal.seaninstitute.or.id/index.php/InfoSains/article/view/8888",
    "created_at": "2026-11-16T15:53:29.565535+00:00"
  },
  {
    "id": 15,
    "title": "INA-FOREWS: An IoT-Based Multi-Site Indonesia Forest Fire Early Warning System with Real-Time Risk Assessment and Alert Capabilities",
    "authors": [
      "Tonny Wahyu Aji",
      "Ahmad Meijlan Yasir",
      "Putri Chairuniza"
    ],
    "journal": "Journal of Computation Physics and Earth Science (JoCPES)",
    "type": "Jurnal",
    "publication_date": "2026-06-15",
    "doi": "10.63581/JoCPES.v6i2.03",
    "abstract": "Despite the limitations of existing forest fire detection solutions, this study proposes the development of an IoT-based INA-FOREWS system to enhance real-time monitoring and risk assessment capabilities in Indonesia's tropical forests. The system aims to mitigate the impacts of forest fires and support progress towards the Sustainable Development Goals (SDGs) by integrating local sensor data with global spatial datasets. The system utilizes a rule-based approach to analyze environmental variables such as temperature, humidity, precipitation, and vegetation index, generating interactive fire risk maps to inform more effective response strategies. The hardware components, including sensors for temperature, humidity, gas, flame, and soil moisture, are deployed across multiple strategic locations and connected to a central ESP32 microcontroller for data transmission to a cloud-based platform. The web-based interface provides visualizations of sensor data, fire risk assessments, and emergency notification features to support decision-making by policymakers, local communities, and emergency responders. The strategic placement of sensors, guided by the rule-based risk assessment model, helps to optimize coverage and enhance the system's capacity for early fire detection. The proposed INA-FOREWS system serves as a model for integrating technological innovation with sustainability-focused objectives, contributing to improved forest fire management practices and supporting ecosystem preservation and community well-being in Indonesia's tropical regions.",
    "link": "https://doi.org/10.63581/JoCPES.v6i2.03",
    "created_at": "2026-11-16T15:53:29.677886+00:00"
  },
  {
    "id": 13,
    "title": "Design and Prototype Development of a Dual-MCU Wireless IoT System for Multi-Gas Air Quality Monitoring in Poultry Environments",
    "authors": [
      "Marzuki Sinambela",
      "Petrus Hiskiawan",
      "Tonny Wahyu Aji",
      "Yobel Eliezer Mahardika",
      "Ahmad Meijlan Yasir",
      "Aviv Maghridlo"
    ],
    "journal": "2026 International Conference on Current Research in Artificial Intelligence and Data Science (ICCRAIDS)",
    "type": "Konferensi",
    "publication_date": "2026-03-01",
    "doi": "10.1109/ICCRAIDS67816.2026.11519697",
    "abstract": "Air quality plays a crucial role in maintaining poultry health and productivity, particularly in intensive farming environments. This paper presents the development of an Internet of Things (IoT)-based air quality monitoring system utilizing dual ESP32 microcontrollers and nRF24L01 wireless modules. The system integrates temperature, humidity, and gas sensors (NH3, CH4, H2S), with data collected every 20 seconds and averaged every 10 minutes for optimized transmission. A responsive dashboard, built with Next.js, provides real-time data visualization. While the system was not tested in an actual poultry facility due to access limitations, a home-based test setup demonstrated stable sensor operation and effective data averaging. The system achieved a packet loss rate below 6.94 % within the operational range of the nRF24L01 module, and the dashboard maintained low latency with minimal refresh intervals. This research provides a reliable framework for continuous air quality monitoring in poultry farming. Future work will focus on extending communication range using LoRa technology and incorporating artificial intelligence for predictive analytics.",
    "link": "https://ieeexplore.ieee.org/document/11519697",
    "created_at": "2026-11-16T15:53:29.430942+00:00"
  },
  {
    "id": 10,
    "title": "Real-Time Monitoring of Ocean Wave Parameters and Surface Currents Using an IoT-Based Autonomous Surface Vessel",
    "authors": [
      "Tonny Wahyu Aji",
      "Muhammad Abdul Haq",
      "Nelly Florida Riama",
      "Dimas Aditya Wiranata",
      "Antonius Kukuh Prasetyaji",
      "Anton Widodo",
      "Yobel Eliezer Mahardika",
      "Marzuki Sinambela",
      "Ahmad Meijlan Yasir"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2025-08-06",
    "abstract": "i\nThis research addresses the high cost and limited flexibility of traditional buoy-based ocean monitoring systems, which are often impractical for real-time and mobile data acquisition. We developed an IoT-based Autonomous Surface Vessel (ASV) equipped with sensor fusion and dual LoRa-WiFi communication for measuring wave height and surface currents. This system was intended to support field needs such as early warning, coastal navigation, and observational studies. Kalman filtering was applied to the fused sensor data, and LoRa and Wi-Fi were utilized to maintain connectivity in different deployment zones. We observed that the system could still transmit data under limited signal availability, especially near coastal boundaries. The vessel has sensors that track wave height, current flow, and various environmental indicators. To support real-time data visualization, we created a website as a monitoring",
    "link": "https://ieeexplore.ieee.org/abstract/document/11280871",
    "created_at": "2026-02-18T21:02:01.973795+00:00"
  },
  {
    "id": 11,
    "title": "Comparative Performance Analysis of Firebase Realtime Database and Supabase Using Multi-Method Testing Approaches",
    "authors": [
      "Ahmad Meijlan Yasir",
      "Tri Andi",
      "Muhammad Abdul Haq",
      "Muchamad Rizqy Nugraha",
      "Marzuki Sinambela",
      "Tonny Wahyu Aji",
      "Yobel Eliezer Mahardika",
      "Aviv Maghridlo"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2025-08-06",
    "abstract": "This study presents a comparative performance analysis of Firebase Realtime Database (RTDB) and Supabase, focusing on latency, scalability, throughput, and cost efficiency, which are critical for real-time application performance. The research addresses the challenge of selecting the most suitable database for applications requiring reliable performance under varying loads and data volumes. A multi-method approach, including latency tests, scalability assessments with concurrent users (100, 500 and 1,000), and throughput evaluations under high-volume requests, was employed. Independent sample ttests were used to validate the quantitative results. The findings reveal that Firebase RTDB consistently outperforms Supabase, particularly in terms of latency and scalability. Firebase RTDB demonstrated significantly higher throughput with a p value less than 0.01 and significantly lower average response times",
    "link": "https://ieeexplore.ieee.org/abstract/document/11281116",
    "created_at": "2026-02-18T21:03:55.375134+00:00"
  },
  {
    "id": 12,
    "title": "A Low-Cost, Mobile System for Monitoring Solar Radiation",
    "authors": [
      "Aviv Maghridlo",
      "Dwijoko Purbohadi",
      "Ahmad Meijlan Yasir",
      "Tonny Wahyu Aji",
      "Yobel Eliezer Mahardika",
      "Marzuki Sinambela",
      "Tri Andi"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2025-08-06",
    "abstract": "Accurate solar radiation monitoring is crucial for optimizing solar energy systems, studying climate change, and assessing environmental risks. Traditional solar radiation monitoring instruments, such as pyranometers, are expensive and complex, limiting their accessibility in low-resource areas. This paper presents a low-cost, portable solar radiation monitoring system that integrates multiple sensors, including the UVM-30A for UV index, TSL2561 for light intensity, and INA219 for solar energy measurement. The system utilizes an ESP32 microcontroller for data processing and an Arduino Uno for backup storage and display. Data is collected in real time, stored locally on an SD card, and uploaded remotely to a Firebase database for easy access. A web-based graphical user interface (GUI) allows users to visualize and monitor the data remotely. The system was tested over a period of time, collecting over 3800 data",
    "link": "https://ieeexplore.ieee.org/abstract/document/11281324/",
    "created_at": "2026-02-18T21:04:49.649924+00:00"
  },
  {
    "id": 9,
    "title": "Integration of IoT and BMKG API for Android-based Air Quality Monitoring and Urban Heat Island Prediction System",
    "authors": [
      "I Made Prabawa Sandhi Gotama",
      "Nizirwan Anwar",
      "Alivia Yulfitri",
      "Raden Teddy Iswahyudi",
      "I Made Dwi Pramana Putra",
      "Aviv Maghridlo",
      "Ahmad Meijlan Yasir",
      "Tonny Wahyu Aji",
      "Marzuki Sinambela"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2025-05-24",
    "abstract": "The increasing impacts of climate change and urbanization are causing the Urban Heat Island (UHI) phenomenon to occur. The UHI phenomenon affects air quality in urban areas. This research proposes the design and development of a cost-effective air quality monitoring system integrated with an Android app. The system utilizes Internet of Things (IoT)-based sensors, including DHT22 for temperature and humidity, MQ-135 for nitrogen dioxide (NO2), MQ-7 for carbon monoxide (CO), and GP2Y1010AUF0 for PM2.5 detection. The collected data is processed through an ESP32 microcontroller and sent to a database, enabling real-time monitoring. The system also integrates the Application Programming Interface (API) of the Meteorology, Climatology, and Geophysics Agency (BMKG) for UHI intensity prediction. The developed Android application presents data in the form of visualizations and real-time notifications",
    "link": "https://ieeexplore.ieee.org/abstract/document/11229451/",
    "created_at": "2026-02-18T21:00:51.676239+00:00"
  },
  {
    "id": 8,
    "title": "Design and Implementation of a Web-Based RFID-Enabled Library Visitor Attendance and Management System: A Case Study at STMKG",
    "authors": [
      "Ahmad Meijlan Yasir",
      "Tonny Wahyu Aji"
    ],
    "journal": "Journal of Computation Physics and Earth Science (JoCPES)",
    "type": "Jurnal",
    "publication_date": "2025-05-24",
    "doi": "10.63581/JoCPES.v5i2.01",
    "abstract": "Academic and institutional libraries require structured, accurate, and real-time visitor data to support service evaluation, resource planning, and institutional reporting. However, traditional manual logbooks frequently suffer from inconsistent record-keeping, human error, time inefficiencies, and delays in data processing. To address these challenges, this study presents the design and implementation of a web-based, Radio Frequency Identification (RFID)-enabled library visitor attendance and management system. The proposed system modernizes visitor tracking through multi-user workflows: RFID-based automated identification for cadets, controlled selection workflows for institutional staff, and structured digital forms for public visitors. Built on a cloud-backed architecture, the system combines a responsive web frontend with a secure backend database for persistent data storage and authentication. Administrative safeguards, real-time visit statistics dashboards, time-filtered logs, and spreadsheet export tools provide an efficient, scalable solution for academic library operations.",
    "link": "https://doi.org/10.63581/JoCPES.v5i2.01",
    "created_at": "2026-11-16T15:53:09.323038+00:00"
  },
  {
    "id": 7,
    "title": "Implementation of LSTM for Weather Prediction in Kupang City, East Nusa Tenggara",
    "authors": [
      "Aviv Maghridlo",
      "Nizirwan Anwar",
      "Alivia Yulfitri",
      "Raden Teddy Iswahyudi",
      "Daniela Adolfina Ndaumanu",
      "Tonny Wahyu Aji",
      "Ahmad Meijlan Yasir",
      "Yobel Eliezer Mahardika",
      "Marzuki Sinambela"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2025-05-24",
    "abstract": "Indonesia’s dynamic and complex weather patterns, particularly in regions like Kupang City, present significant challenges for accurate weather forecasting. This study develops a Long Short-Term Memory (LSTM) deep learning model to predict multiple meteorological parameters—such as temperature, humidity, wind speed, sunshine duration, and rainfall—using a decade-long dataset. The LSTM model achieved strong predictive performance, with low error rates and high accuracy, especially in rainfall classification tasks. Although GRU models offered competitive performance with fewer parameters, LSTM demonstrated greater reliability in capturing complex temporal patterns essential for practical forecasting. The proposed model aims to support critical sectors such as agriculture, transportation, and disaster mitigation by providing more robust and reliable weather predictions for Kupang City.",
    "link": "https://ieeexplore.ieee.org/abstract/document/11227176/",
    "created_at": "2026-02-18T20:57:33.556896+00:00"
  },
  {
    "id": 4,
    "title": "PM2.5 Concentration Prediction Model in Jakarta Area Using Random Forest Algorithm",
    "authors": [
      "Muhammad Naufal Afif Al Arsy",
      "Ahmad Meijlan Yasir"
    ],
    "journal": "Journal of Computation Physics and Earth Science (JoCPES)",
    "type": "Jurnal",
    "publication_date": "2025-02-05",
    "abstract": "This study predicts PM2.5 concentrations in Jakarta using the Random Forest algorithm with data from 2015-2024. The model achieved a Mean Absolute Error of 14.44, Root Mean Square Error of 18.75, and R² Score of 0.61. Analysis showed average PM2.5 concentration of 94.46 µg/m³, with peaks up to 209 µg/m³, exceeding healthy thresholds. The model can support real-time monitoring systems and data-driven policies, with potential for enhancement through incorporation of meteorological variables.",
    "link": "https://journal.physan.org/index.php/jocpes/article/view/52",
    "created_at": "2025-06-07T13:23:49.692846+00:00"
  },
  {
    "id": 3,
    "title": "Redesign of User Interface and Experience with Brand Identity Enhancement for the STMKG Website through WordPress Implementation",
    "authors": [
      "Tonny Wahyu Aji",
      "Ahmad Meijlan Yasir",
      "Agustina Rachmawardani",
      "Marianus Carol Jehadun",
      "Adi Widiatmoko Wastumirad"
    ],
    "journal": "Journal of Computation Physics and Earth Science (JoCPES)",
    "type": "Jurnal",
    "publication_date": "2025-01-20",
    "abstract": "This paper presents the redesign of the STMKG website using WordPress and Elementor. The project modernized the institution's digital presence by enhancing layout consistency, mobile responsiveness, and brand identity. Key improvements included structured program sections, modern news layout, and standardized footer. The project, completed by a sixth-semester cadet, demonstrates the application of accessible web technologies to deliver scalable, branded, and user-centered digital solutions in educational settings.",
    "link": "https://journal.physan.org/index.php/jocpes/article/view/63",
    "created_at": "2025-06-07T13:23:49.692846+00:00"
  },
  {
    "id": 5,
    "title": "The Carbon Dioxide Filtration System Using Chlorella Pyrenoidosa Microalgae IoT-based for Air Quality Improvement",
    "authors": [
      "Tonny Wahyu Aji",
      "Nizirwan Anwar",
      "Ahmad Meijlan Yasir",
      "Aviv Maghridlo",
      "Marzuki Sinambela",
      "Anton Widodo",
      "Muchamad Rizqy Nugraha",
      "Putri Chairuniza"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2024-08-15",
    "abstract": "This project aims to lower CO2 levels using green microalgae (Chlorella pyrenoidosa) and IoT monitoring. The system combines an MG-811 CO2 sensor with an ESP32 microcontroller, with data processed on the ThingSpeak platform. During observation, average CO2 concentration decreased from 707.07 ppm to 677.90 ppm. Statistical analysis revealed a significant trend of decreasing CO2 levels, though data showed inconsistency with a standard deviation of 81.44 ppm.",
    "link": "https://ieeexplore.ieee.org/abstract/document/10957176/",
    "created_at": "2025-06-07T13:23:49.692846+00:00"
  },
  {
    "id": 2,
    "title": "IoT-Based Air Quality Monitoring System Design and Development Using ESP32",
    "authors": [
      "Marzuki Sinambela",
      "Muchamad Rizqy Nugraha",
      "Anton Widodo",
      "Joko Sugi Purnomo Kadir",
      "Ahmad Meijlan Yasir",
      "Tonny Wahyu Aji"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2024-05-10",
    "abstract": "This study develops an ESP32-based Internet of Things (IoT) air quality monitoring system that detects air contaminants and transmits real-time data to a web platform. The system reliably monitors air quality and calculates Air Pollution Index (API) values. Testing revealed strong correlations with standard equipment, with the DFRobot Air Quality sensor showing R² values of 0.9402 and 0.9175 for measured parameters, while the MiCS-4514 sensor achieved an R² value of 0.8315 for CO measurement.",
    "link": "https://ieeexplore.ieee.org/abstract/document/10956737/",
    "created_at": "2025-06-07T13:23:49.692846+00:00"
  },
  {
    "id": 1,
    "title": "Radiosonde System Using ESP32 and LoRa Ra-02 Web-Based for Upper-Air Profile Observation",
    "authors": [
      "Muchamad Rizqy Nugraha",
      "Putri Chairuniza",
      "Ahmad Meijlan Yasir",
      "Tonny Wahyu Aji",
      "Aviv Maghridlo",
      "Anton Widodo",
      "Marzuki Sinambela"
    ],
    "journal": "Institute of Electrical and Electronics Engineers (IEEE)",
    "type": "Konferensi",
    "publication_date": "2024-03-15",
    "abstract": "This study explores upper air profile observation using a radiosonde system based on ESP32 and LoRa Ra-02 technology. The system measures atmospheric parameters like temperature, humidity, pressure, and wind speed at various heights above the earth's surface. The developed web-based system provides a cost-effective alternative to traditional expensive radiosonde solutions, transmitting observation data from balloon-carried sensors to ground stations for weather forecasting and atmospheric analysis.",
    "link": "https://ieeexplore.ieee.org/abstract/document/10762300/",
    "created_at": "2025-06-07T13:23:49.692846+00:00"
  },
  {
    "id": 6,
    "title": "Model of Lightning Strike Risk to Humans Based on Spatial Analysis and Environmental Factors",
    "authors": [
      "Ahmad Andru Alfandhi Amarsin",
      "Ahmad Meijlan Yasir"
    ],
    "journal": "Journal of Computation Physics and Earth Science (JoCPES)",
    "type": "Jurnal",
    "publication_date": "2023-11-12",
    "abstract": "This study develops a predictive model of lightning strike risk to humans using spatial analysis and environmental data. The model utilizes lightning distribution, land use, population density, and meteorological parameters to identify key risk factors. Results show densely populated areas in Java and Sumatra are particularly vulnerable. The generated risk maps provide insights for disaster mitigation planning and infrastructure protection, highlighting the correlation between lightning density, land use, and population exposure.",
    "link": "https://journal.physan.org/index.php/jocpes/article/view/23",
    "created_at": "2025-06-07T13:23:49.692846+00:00"
  }
];
