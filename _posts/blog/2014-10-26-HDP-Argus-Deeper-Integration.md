---
layout: post
category: blog
title: "Argus Deeper Integration "
excerpt: "Argus deeper integration to HBASE & HIVE"
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

#### Deeper Integration (HBase)

- Pre Champlain
    + Hbase Agents supports table, CF, Column level permissions
    + Local Permissions not integrated

- Post Champlain
    + Integrate local grant/revoke permissions
    + New Argus/XA co-processor, no changes in HBase
    + Hbase-site.xml

{% highlight css %}
<property>
    <name>hbase.coprocessor.master.classes</name>
    <value>com.xasecure.authorization.hbase.XaSecureAuthorizationCoprocessor</value>  <property>
    <name>hbase.coprocessor.region.classes</name>
    <value>com.xasecure.authorization.hbase.XaSecureAuthorizationCoprocessor</value>
{% endhighlight %}

***

##### HBase Grant Revoke 

- Command Line Operations
    + Permission supported
        + Admin (A) / Create © / Write (W) / Read (R)

- Can be performed at table, CF, column level
{% highlight css %}
grant <user> <permissions>[ <table>[ <column family>[ <column qualifier> ] ] ]    # grants permissions
revoke <user> <permissions> [ <table> [ <column family> [ <column qualifier> ] ] ]   # revokes permissions
{% endhighlight %}

#### Deeper Integration (Hive)

- Pre Champlain
    +  XA Secure/Argus uses multiple hooks in Hive
    + Not all information necessary to make authorization decision are available in Hive authorizer hooks
    + Local Grant/Revoke permission not integrated with Argus
    + Storage based authorization only looks at POSIX permissions

{% highlight css %}
hive.security.authorization.manager=com.xasecure.authorization.hive.authorizer.XaSecureAuthorizer
hive.semantic.analyzer.hook=com.xasecure.authorization.hive.hooks.XaSecureSemanticAnalyzerHook
hive.exec.post.hooks=com.xasecure.authorization.hive.hooks.XaSecureHivePostExecuteRunHook
{% endhighlight %}

- Champlain Integration
    + New plug-in model in Hive to support external authorizers
        * All information necessary to make authorization decision are provided to authorizer plug-in
    + XASecure/Argus Hive agent registers a single hook with Hive for authorization
{% highlight css %}
hive.security.authorization.manager=com.xasecure.authorization.hive.authorizer.XaSecureHiveAuthorizerFactory
{% endhighlight %}


    + Integrate Grant/Revoke permissions
        * New Hive Plugin enables Argus to handle Grant/Revoke permission
        * Argus will store Grant/Revoke policy and enforce it, with auditing
        * Option to disable Grant/Revoke
        * Group/Roles mapped to Groups in Argus Admin
    + Storage Based Authorization
        * In SBA, Hive used HDFS permissions for allowing operations
        * HDFS Permission Check
            - Hive uses RPC to communicate with HDFS and validate permission on HDFS folders
            - If Argus is enabled, Hive will use permissions based on Argus policies in HDFS
            - Argus can be used for Storage based and regular Hive authorization

#### Deeper Integration (HDFS)

- Pluggable HDFS authorization is being added (HDFS-6826)
- Argus will replace the JavaAgent based code injection with a custom authorization plugin

> Still in Discussions

***
**Reference www.hortonworks.com**

