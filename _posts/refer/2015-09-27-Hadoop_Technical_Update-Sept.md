---
layout: post
category: refer
title: "Hadoop Technical Updates / 27-09-2015"
excerpt: "Hadoop Technical updates for Sept 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://blogs.aws.amazon.com/bigdata/post/Tx2Q3JGH427TL8Z/How-Coursera-Manages-Large-Scale-ETL-using-AWS-Data-Pipeline-and-Dataduct:
http://blog.cloudera.com/blog/2015/09/how-to-prepare-your-apache-hadoop-cluster-for-pyspark-jobs/:
http://gethue.com/how-to-use-the-livy-spark-rest-job-server-for-interactive-spark/:
http://blog.cloudera.com/blog/2015/09/introduction-to-hdfs-erasure-coding-in-apache-hadoop/:
http://www.confluent.io/blog/schema-registry-kafka-stream-processing-yes-virginia-you-really-need-one:
http://blog.cloudera.com/blog/2015/09/making-apache-spark-testing-easy-with-spark-testing-base/:
https://databricks.com/blog/2015/09/22/large-scale-topic-modeling-improvements-to-lda-on-spark.html:
https://blogs.apache.org/nifi/entry/indexing_tweets_with_nifi_and:
http://arxiv.org/abs/1509.05393:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

If you like reading about distributed systems or are interested in learning more about the CAP theorem, then Martin Kleppmann's "A Critique of the CAP Theorem" is for you. It discusses the theorem and many of the common confusions in terminology. It then proposes an alternative to the CAP theorem, which is aimed at helping practitioners reason about common trade-offs.
 
- [http://arxiv.org/abs/1509.05393](http://arxiv.org/abs/1509.05393)
 
 
The Apache blog describes building an Apache NiFi flow that ingests tweets from the Twitter API, does some light-weight processing, and stores the resulting tweets into Solr. It demonstrates some of NiFi's built-in tools, such as json evaluation and batching.
 
- [https://blogs.apache.org/nifi/entry/indexing_tweets_with_nifi_and](https://blogs.apache.org/nifi/entry/indexing_tweets_with_nifi_and)
 
 
The Databricks blog has a post that gives an overview of Spark's implementation of Latent Dirichlet Allocation (LDA). Spark implements an online variant of the algorithm, which improves performance and scalability. The post links to example code on github and provides a number of tips for using LDA.
 
- [https://databricks.com/blog/2015/09/22/large-scale-topic-modeling-improvements-to-lda-on-spark.html](https://databricks.com/blog/2015/09/22/large-scale-topic-modeling-improvements-to-lda-on-spark.html)
 
 
Spark Testing Base is a library for testing Spark code in Scala and Java. This post gives an overview of the functionality, which includes the ability to test non-trivial jobs (such a Spark streaming).
 
- [http://blog.cloudera.com/blog/2015/09/making-apache-spark-testing-easy-with-spark-testing-base/](http://blog.cloudera.com/blog/2015/09/making-apache-spark-testing-easy-with-spark-testing-base/)
 
 
This post articulates several reasons why it's a good idea to invest in operating a centralized schema registry for a data platform. Reasons include enforcing safe schema evolution, storage efficiency, data discovery, and data policy enforcement. The post also describes why it's critical for stream processing.
 
- [http://www.confluent.io/blog/schema-registry-kafka-stream-processing-yes-virginia-you-really-need-one](http://www.confluent.io/blog/schema-registry-kafka-stream-processing-yes-virginia-you-really-need-one)
 
 
Erasure codings are a well-known mechanism of data protection that can incur less overhead than Hadoop's three-way replication. Adding this to HDFS was proposed over five years ago, and engineers from Cloudera and Intel are working on it for the upcoming Hadoop 3.0 release. This blog post has an in-depth overview of the strategy and implementation, which takes advantage of hardware acceleration for encoding and decoding parity data.
 
- [http://blog.cloudera.com/blog/2015/09/introduction-to-hdfs-erasure-coding-in-apache-hadoop/](http://blog.cloudera.com/blog/2015/09/introduction-to-hdfs-erasure-coding-in-apache-hadoop/)
 
 
Hue includes Livy, a REST interface for interacting with Spark. This post describes how to start Livy to run Spark jobs, and it gives examples of starting a Spark shell and entering commands via the REST api.
 
- [http://gethue.com/how-to-use-the-livy-spark-rest-job-server-for-interactive-spark/](http://gethue.com/how-to-use-the-livy-spark-rest-job-server-for-interactive-spark/)
 
 
Unlike java or scala libraries, python libraries often aren't portable across machines. This can cause problems for a distributed computation with PySpark, but there are a few strategies to distribute the necessary libraries. This post describes them (e.g. shipping a py file, py egg, setting up a virtualenv on each node) and when each is most appropriate.
 
- [http://blog.cloudera.com/blog/2015/09/how-to-prepare-your-apache-hadoop-cluster-for-pyspark-jobs/](http://blog.cloudera.com/blog/2015/09/how-to-prepare-your-apache-hadoop-cluster-for-pyspark-jobs/)
 
 
This post describes Coursera's data infrastructure, which ties together Cassandra, Scalding, Amazon Redshift, and more. They use Dataduct, which is a python framework for the AWS Data Pipeline to manage workflows.
 
- [http://blogs.aws.amazon.com/bigdata/post/Tx2Q3JGH427TL8Z/How-Coursera-Manages-Large-Scale-ETL-using-AWS-Data-Pipeline-and-Dataduct](http://blogs.aws.amazon.com/bigdata/post/Tx2Q3JGH427TL8Z/How-Coursera-Manages-Large-Scale-ETL-using-AWS-Data-Pipeline-and-Dataduct)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**