---
layout: post
category: refer
title: "Hadoop Technical Updates / 11-10-2015"
excerpt: "Hadoop Technical updates for Oct 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://thesecretlivesofdata.com/raft/:
http://blog.cloudera.com/blog/2015/10/how-to-build-a-machine-learning-app-using-sparkling-water-and-apache-spark/:
http://harshj.com/writing-a-simple-kudu-java-api-program/:
http://peter-hoffmann.com/2015/getting-started-with-the-cloudera-kudu-storage-engine-in-python.html:
https://www.mapr.com/blog/distributed-stream-and-graph-processing-apache-flink:
http://blog.cloudera.com/blog/2015/10/continuous-distribution-goodness-of-fit-in-mllib-kolmogorov-smirnov-testing-in-apache-spark/:
http://multithreaded.stitchfix.com/blog/2015/10/06/spark-for-data-science/:
http://www.slideshare.net/gwenshap/nyc-kafka-meetup-2015-when-bad-things-happen-to-good-kafka-clusters:
http://www.datanami.com/2015/10/05/how-uber-uses-spark-and-hadoop-to-optimize-customer-experience/:
https://www.mapr.com/blog/quick-guide-spark-streaming:
http://blog.insightdatalabs.com/spark-cluster-step-by-step/:
https://databricks.com/blog/2015/10/05/generalized-linear-models-in-sparkr-and-r-formula-support-in-mllib.html:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

Spark is the topic of over half of the technical articles this week. As evidenced by new features and companies sharing practical knowledge, it is maturing (and gaining plenty of adoption) as a product. Aside from the great articles on Spark, I highly recommend the visualization covering the fundamentals of Raft's distributed consensus algorithm.
 
 
In Spark 1.5, SparkR gained support for distributed computation of generalized linear models. This tutorial shows how to use the SparkR APIs to perform to build a linear model for predicting airline delays.
 
- [https://databricks.com/blog/2015/10/05/generalized-linear-models-in-sparkr-and-r-formula-support-in-mllib.html](https://databricks.com/blog/2015/10/05/generalized-linear-models-in-sparkr-and-r-formula-support-in-mllib.html)
 
 
This tutorial describes how to build a Apache Spark cluster on Amazon Web Services using spot instances (which provide a significant cost savings). The instructions describe using the AWS web console, installing Spark using a recent release, and configuring Spark's important settings.
 
- [http://blog.insightdatalabs.com/spark-cluster-step-by-step/](http://blog.insightdatalabs.com/spark-cluster-step-by-step/)
 
 
The MapR blog has a guide to Spark Streaming, which discusses Spark Streaming's API and streaming model (microbatch). It also describes processing semantics (at least once, exactly once, at most once), which vary depending on the input source for Spark Streaming.
 
- [https://www.mapr.com/blog/quick-guide-spark-streaming](https://www.mapr.com/blog/quick-guide-spark-streaming)
 
 
Datanami has an article describing how Uber has migrated from a data system built on Amazon EMR and Celery/Python ETL to a new system built on Spark and Kafka. Uber makes heavy use of Spark Streaming and Spark SQL, and they've built two Spark-based tools to keep the system running smoothly. The first, called Paricon, is used to validate data contracts when schema's change, and the second, called Komondor, takes care of common ingestion pieces (like dedup).
 
- [http://www.datanami.com/2015/10/05/how-uber-uses-spark-and-hadoop-to-optimize-customer-experience/](http://www.datanami.com/2015/10/05/how-uber-uses-spark-and-hadoop-to-optimize-customer-experience/)
 
 
Compared to other distributed systems, Kafka is relatively easy to configure and operate. But that's not to say it never has problems—this presentation describes several situations where folks have experienced trouble.
 
- [http://www.slideshare.net/gwenshap/nyc-kafka-meetup-2015-when-bad-things-happen-to-good-kafka-clusters](http://www.slideshare.net/gwenshap/nyc-kafka-meetup-2015-when-bad-things-happen-to-good-kafka-clusters)
 
 
The Stitch Fix blog has a post describing their experience with Spark. It covers how they think about when to use Spark, the Spark Data Source API, caching, the DataFrame API, and SparkSQL. There are some good tips and anecdotes—e.g. that Stick Fix converted some Python jobs to use the DataFrame API and saw 6x performance improvements.
 
- [http://multithreaded.stitchfix.com/blog/2015/10/06/spark-for-data-science/](http://multithreaded.stitchfix.com/blog/2015/10/06/spark-for-data-science/)
 
 
This post describes some statistical tests added to Spark's MLlib for Goodness-of-Fit. It contains some background on the tests, and how they're implemented in Spark.
 
- [http://blog.cloudera.com/blog/2015/10/continuous-distribution-goodness-of-fit-in-mllib-kolmogorov-smirnov-testing-in-apache-spark/](http://blog.cloudera.com/blog/2015/10/continuous-distribution-goodness-of-fit-in-mllib-kolmogorov-smirnov-testing-in-apache-spark/)
 
 
The MapR blog has a recap of the three talks given at the recent Bay Area Apache Flink Meetup. The talks covered stateful distributed stream processing, Gelly (the Flink graph processing API), and the future of Apache Flink.
 
- [https://www.mapr.com/blog/distributed-stream-and-graph-processing-apache-flink](https://www.mapr.com/blog/distributed-stream-and-graph-processing-apache-flink)
 
 
Kudu, the new distributed storage engine from Cloudera, includes APIs in Java, C++, and Python (in alpha). These articles give an overview and introduction to the Kudu APIs in Python and Java.
 
- [http://peter-hoffmann.com/2015/getting-started-with-the-cloudera-kudu-storage-engine-in-python.html](http://peter-hoffmann.com/2015/getting-started-with-the-cloudera-kudu-storage-engine-in-python.html)
- [http://harshj.com/writing-a-simple-kudu-java-api-program/](http://harshj.com/writing-a-simple-kudu-java-api-program/)
 
 
Sparkling Water is a library for combining H2O.ai's machine learning APIs and UI with Apache Spark. This post describes how Spark and H2O work together (both the API and architecture) and walks through an example of building a deep learning model using Sparkling Water.
 
- [http://blog.cloudera.com/blog/2015/10/how-to-build-a-machine-learning-app-using-sparkling-water-and-apache-spark/](http://blog.cloudera.com/blog/2015/10/how-to-build-a-machine-learning-app-using-sparkling-water-and-apache-spark/)
 
 
This visualization provides an excellent introduction to the Raft distributed consensus algorithm. During the visualization (which lasts about 5 minutes), several animations describe leader election and log replication. If you're a visual learner (or even if not), this is one of the best ways to learn the fundamentals of Raft.
 
- [http://thesecretlivesofdata.com/raft/](http://thesecretlivesofdata.com/raft/)



**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**