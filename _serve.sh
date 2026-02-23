#!/bin/bash
export PATH="/Users/maohuiyang/.rbenv/versions/3.2.2/bin:$PATH"
export GEM_HOME="/Users/maohuiyang/.rbenv/versions/3.2.2/lib/ruby/gems/3.2.0"
export GEM_PATH="/Users/maohuiyang/.rbenv/versions/3.2.2/lib/ruby/gems/3.2.0"
cd /Users/maohuiyang/Documents/Github/LittleCaps.github.io
exec ruby /Users/maohuiyang/.rbenv/versions/3.2.2/bin/bundle exec jekyll serve --host 0.0.0.0 --port 4001
