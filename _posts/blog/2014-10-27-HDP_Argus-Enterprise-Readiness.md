---
layout: post
category: blog
title: "Enterprise Readiness with Argus & HDP Champlain"
excerpt: "Argus & HDP Champlain to provide enterprise readiness"
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---
### Enterprise Readiness (REST APIs)

- Currently, Argus policies can only be managed through GUI
- Not a scalable model if there are large number of policies
- Champlain work to expose REST APIs for the policy manager
- Users can create/update/delete policies through these APIs

***

> REST APIS AVAILABLE - Repository Management

|REST API|Request type|Request URL*|
|--------|------------|------------|
|Get Repository|GET|service/public/api/repository/{id}|
|Create Repository|POST|service/public/api/repository|
|Update Repository|PUT|service/public/api/repository/{id}|
|Delete Repository|DELETE|service/public/api/repository/{id}|
|Search Repositories|GET|service/public/api/repository|

***

> REST API’s exposed in Champlain - Policy Management

|REST API|Request type|Request URL*|
|--------|------------|------------|
|Get Policy|GET|service/public/api/policy/{id}|
|Create Policy|POST|service/public/api/policy|
|Update Policy|PUT|service/public/api/policy/{id}|
|Delete Policy|DELETE|service/public/api/policy/{id}|
|Search Policies|GET|service/public/api/policy|

### Enterprise Readiness (Audit Log Storage in HDFS)

- Pre Champlain
    + Argus audit data only in RDBMS (mysql)
        * Issue with scalability

- Champlain Release
    + Option to write to RDBMS (mySQL or Oracle), HDFS
            - Argus Audit Logs To HDFS
            - Log event is written to Local log file
            - Local log file will be copied to HDFS destination (when HDFS is available)
            - Local log file and HDFS file rotated at a regular interval
            - Design being enhanced
    + Addition of Log4j file appender
        * HDFS destination can be specified in the appender
        * Customer/Partners can add customer log4j appenders
    + Extensible HDFS LOG format
        *  Available as JSON format

***

**Reference www.hortonworks.com**
