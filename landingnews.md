---
layout: page
title: News Feeds
nav-menu: true
---

<!-- Main -->
<div id="main" class="alt">

<!-- One -->
<section id="one">
	<div class="inner">
		<header class="major">
			<h3> Medium</h3>
		</header>

<h4> <a href="https://medium.com/mit-technology-review"> Latest Blog Posts from MIT Technology Review </a></h4>

{% for e in site.medium_posts %}

<div>
<a href="{{e.medium_link}}" title="{{ e.title }}">{{ e.title }}</a>
      <p>{{ e.feed_content | strip_html | truncate: 160 }}</p>
  {% endfor %}

</div>
