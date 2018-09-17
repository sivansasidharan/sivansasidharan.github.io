---
layout: post
category: blog
title: "Why Apache Spark"
excerpt: " Apache Spark for Data Scientists ?"
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

Spark for data science has mostly noted for its ability to keep data resident in memory, which can speed up iterative machine learning workloads compared to MapReduce.Spark has a number of features that make it a compelling crossover platform for investigative as well as operational analytics:

* Spark comes with a machine-learning library, MLlib.
    + Being Scala-based, Spark embeds in any JVM-based operational system
        - but can also be used interactively in a REPL, familiar to R and Python users.
* For Java programmers, Scala still presents a learning curve.
    -  but at least, any Java library can be used from within Scala.
* Spark’s RDD (Resilient Distributed Dataset) abstraction resembles Crunch’s PCollection
    - which has proved a useful abstraction in Hadoop(familiar to Crunch developers) 
    - Crunch can even be used on top of Spark
* Spark imitates Scala’s collections API and functional style
    - which is a boon to Java and Scala developers
    - also somewhat familiar to developers coming from Python
    - Scala is also a compelling choice for statistical computing.
* Spark itself, and Scala underneath it, are not specific to machine learning. 
    - They provide APIs supporting related tasks, like data access, ETL, and integration. 
    - As with Python, the entire data science pipeline can be implemented within this paradigm, not just the model fitting and analysis.
* Code that is implemented in the REPL environment can be used mostly as-is in an operational context.
* Data operations are transparently distributed across the cluster, even as you type.

Spark is a compelling multi-purpose platform for use cases that span investigative, as well as operational, analytics.Spark, and MLlib in particular, still has a lot of growing to do. The project needs optimizations, fixes, and deeper integration with YARN. It doesn’t yet provide nearly the depth of library functions that conventional data analysis tools do.

** Reference - http://blog.cloudera.com **

