---
layout: post
category: blog
title: "Data Compression in Hadoop"
excerpt: "An Overview on data compression in hadoop "
tags: [bigdata, hadoop, apache, hortonworks, compression]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

Hadoop users are encouraged to keep all data in order to prepare for future use cases and as-yet-unknown data integration points. This concept is part of what makes Hadoop and HDFS so appealing, so it is important to make sure that the data is being stored in a way that prolongs that behavior.One important factor in improving manageability is data compression.In many cluster environments, compression is disabled by default, putting the burden on the user.
We need to decide and know on how to take advantage of compression techniques and the advantages and disadvantages of specific compression codec options with respect to Hadoop.

## To compress or not to compress

Whenever data is converted to something other than its raw data format, there is some overhead involved in completing the conversion process. It is important to take this overhead into account with respect to the benefits of reducing the data footprint.

One obvious benefit is that compressed data will reduce the amount of disk space that is required for storage of a particular dataset. In the big data environment, this benefit is especially significant

* the Hadoop cluster will be able to keep data for a larger time range
* storing data for the same time range will require fewer nodes 
* the disk usage ratios will remain lower for longer
* the smaller file sizes will mean lower data transfer times;either internally for MapReduce jobs or when performing exports of data results

The cost of these benefits, however, is that 

* the data must be decompressed at every point where the data needs to be read, and compressed before being inserted into HDFS.

With respect to MapReduce jobs, this processing overhead at both the map phase and the reduce phase will increase the CPU processing time.

How to ensure that the advantages of compression outweigh the disadvantages.

## Choosing the right codec for each phase

Hadoop provides the user with some flexibility on which compression codec is used at each step of the data transformation process.Certain codecs are optimal for some stages, and non-optimal for others.

+ zlib

The major benefit of using this codec is that it is the easiest way to get the benefits of data compression from a cluster and on the job configuration standpoint—the zlib codec is the default compression option. From the data transformation perspective, this codec will decrease the data footprint on disk, but will not provide much of a benefit in terms of job performance.

+ gzip

The gzip codec available in Hadoop is the same one that is used outside of the Hadoop ecosystem. It is a common practice to use this as the codec for compressing the final output from a job, simply for the benefit of being able to share the compressed result with others (possibly outside of Hadoop) using a standard file format.

+ bzip2

There are two important benefits for the bzip2 codec. 
> First, if reducing the data footprint is a high priority, this algorithm will compress the data more than the default zlib option.

> Second, this is the only supported codec that produces “splittable” compressed data.

A major characteristic of Hadoop is the idea of splitting the data so that they can be handled on each node independently. With the other compression codecs, there is an initial requirement to gather all parts of the compressed file in order to have all information necessary to decompress the data. With this format, the data can be decompressed in parallel. This splittable quality makes this format ideal for compressing data that will be used as input to a map function, either in a single step or as part of a series of chained jobs.

+ LZO, LZ4, Snappy

These three codecs are ideal for compressing intermediate data, the data output from the mappers that will be immediately read in by the reducers. All three codecs heavily favor compression speed over file size ratio, but the detailed specifications for each algorithm should be examined based on the specific licensing, cluster, and job requirements.

## Enabling compression

Once the appropriate compression codec for any given transformation phase has been selected, there are a few configuration properties that need to be adjusted in order to have the changes take effect in the cluster.

+ Intermediate data to reducer

{% highlight css %}
mapreduce.map.output.compress = true
(Optional) mapreduce.map.output.compress.codec = org.apache.hadoop.io.compress.SnappyCodec
{% endhighlight %}

+ Final output from a job

{% highlight css %}
mapreduce.output.fileoutputformat.compress = true
(Optional) mapreduce.output.fileoutputformat.compress.codec = org.apache.hadoop.io.compress.BZip2Codec
{% endhighlight %}

+ Within Hive & Pig 

These compression codecs are also available within some of the ecosystem tools like Hive and Pig. In most cases, the tools will default to the Hadoop-configured values for particular codecs, but the tools also provide the option to compress the data generated between steps.

* Pig

{% highlight css %}
pig.tmpfilecompression = true
(Optional) pig.tmpfilecompression.codec = snappy
{% endhighlight %}

* Hive

{% highlight css %}
hive.exec.compress.intermediate = true
hive.exec.compress.output = true
{% endhighlight %}