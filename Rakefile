desc "Build quickload.min.js"
task :build do
  sh 'uglifyjs quickload.js > quickload.min.js'
  puts "#{File.size('quickload.min.js')} bytes"
end

