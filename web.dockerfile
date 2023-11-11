# Builder image
# Use an official PHP and Apache base image
FROM httpd as builder

LABEL "Team" "LookinLabs"

LABEL "Product" "LookinLabs web"

RUN apt update && \
    apt install -y npm ca-certificates wget curl zip unzip -qq

RUN curl -fsSL https://bun.sh/install | bash && \
    mv ~/.bun/bin/bun /bin/bun && \
    bun --version

WORKDIR /usr/local/apache2/htdocs/

# Copy the project files to the working directory
COPY ./web/ .

# Application image
FROM httpd

WORKDIR /usr/local/apache2/htdocs/
COPY --from=builder /usr/local/apache2/htdocs/ ./
# Expose the Apache port
EXPOSE 80

# Start the Apache server
CMD ["httpd-foreground"]
