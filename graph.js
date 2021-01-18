const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 960)
    .attr('height', 700);

const graph = svg.append('g')
    .attr('transform', 'translate(50, 50)');

const stratify = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent);

const rootNode = stratify(data)
    .sum(d => d.amount);

const pack = d3.pack()
    .size([860, 600])
    .padding(3)

const bubbleData = pack(rootNode).descendants();

const colour = d3.scaleOrdinal(d3['schemeSet3']);

// tip
const tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(d => {
        let content = `<div class="name">${d.data.name}</div>`;
        content += `<div class="amount">Poplulation: ${d.data.amount} people</div>`;
        return content;
});

graph.call(tip);

// join data and add group for each node
const nodes = graph.selectAll('g')
    .data(bubbleData)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

nodes.append('circle')
    .attr('r', d => d.r)
    .attr('stroke', '#000')
    .attr('stroke-width', 1.3)
    .attr('fill', d => colour(d.data.name))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);