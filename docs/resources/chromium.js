const chrom_celllayer = {
    id: "celltype",
    type: "Vnode",
    title: "Select Cell Type",
    //debug: true,
    style: {
        height: "350px",
        width: "350px",
        font: "Arial, sans-serif",
        border: "", // "removed the border from debug mode
    },
    nodes: vnodes,
    config: {
        animation: false,
        draggable: true,
        height: '88%',
        unclickable: ['ENS (E)', 'IM (E)', 'MES (E)',
            'ENDO (E)', 'ERY (S)', 'ERY (E)', 'ST (E)', 'EPI (S)', 'Esophagus',
            'EPI (E)', 'MES (S)'],
        symbolSize: 'value',
        color: {
            //selected: "skyblue",
            unselectable: "black"
        }
    },
    row: 1,
    col: 1,
};

const chrom_searchbar = {
    id: "chrom_gene",
    type: "SearchBar",
    title: "Search Gene",
    //debug: true,
    words: "https://visualify.pharmacy.arizona.edu/api/esodev/genelist/Chromium/", //"https://visualify.pharmacy.arizona.edu/data/gene"
    urlval: "gene",
    nested: true,
    entry: 'vnode', // new options only works with nested is true
    wordlimit: 15,
    suggestLen: 3,
    placeholder: " Search...",
    entry_mapping: {
        'ENS (S)': 'ens_iter_2',
        'IM (S)': 'im_iter_2',
        'MES (S)': 'mes_iter_2',
        'SKM (S)': 'skm_iter_2',
        'ENDO (S)': 'endo_iter_2',
        'EPI (E)': 'epi_iter_2',
        'Stroma': 'stroma_iter_1',
        'Epithelium': 'epi_iter_1',
    },
    searchStyle: {
        borderRadius: "15px",
        width: "100%",
    },
    style: {
        height: "130px",
        width: "350px",
        font: "Arial, sans-serif",
        alignContent: "center",
        //margin: "0 50% 0 10%",
    },
    val: "chrom_gene",
    row: 3,
    col: 1,
}

const chrom_scatter2d = {
    type: "ScatterBio",
    id: "chrom_scatter2d",
    //debug: true,
    startup_msg: 'Cell Type',
    row: 1,
    col: 3,
    rowspan: 3,
    meta: "https://visualify.pharmacy.arizona.edu/api/esodev/celltypes/Chromium/",
    simpleload: false,
    metaval: 'vnode',
    entry_mapping: {
        'ENS (S)': 'ens_iter_2',
        'IM (S)': 'im_iter_2',
        'MES (S)': 'mes_iter_2',
        'SKM (S)': 'skm_iter_2',
        'ENDO (S)': 'endo_iter_2',
        'EPI (E)': 'epi_iter_2',
        'Stroma': 'stroma_iter_1',
        'Epithelium': 'epi_iter_1',
    },
    gene: "https://visualify.pharmacy.arizona.edu/api/esodev/gene/Chromium/",
    geneval: "chrom_gene",
    axis_mapping: {
        x: "2D_UMAP_1",
        y: "2D_UMAP_2",
        extra: {
            "Stage": "Stage",
            "UMI": "n_UMIs",
            "MT": "percent_MT",
            "Gene": "n_Genes",
            "Cell_Type": "Cell_Type",
        }
    },
    colourval: 'chrom_colour',
    // the above setting is the minimum setting for the scatter plot
    // the following are the optional settings
    config: {
        zcolor: ["#808080", "#FFA500", "#FF0000"],
        toolbox: {
            saveAsImage: {
                show: true,
            },
        },
        dataZoom: "inside", // "inside", "slider", 'both'
        dotsize: 'auto',
        labels: {
            x: "UMAP 1",
            y: "UMAP 2",
            z: ["log2\n(tpm+1)", ""],
        },
        xAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            nameGap: 10,
            nameTextStyle: {
                fontSize: 18, // Set font size
                fontWeight: "bold", // Set font weight to bold
            },
        },
        yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            nameGap: 10,
            nameTextStyle: {
                fontSize: 18, // Set font size
                fontWeight: "bold", // Set font weight to bold
            },
        },
        legend: {
            textStyle: {
                fontSize: 18,
            },
            type: "auto",
            orient: "horizontal",
            right: "center", // "top" | "bottom" | "center"
            itemWidth: 20,
            width: 600,
            top: 30,
            /*tooltip: {
                show: true,
                trigger: 'item', // Show tooltip when hovering over legend item
                formatter: function (params) {
                    console.log(params);
                    return 'Tooltip for ' + params.name;
                }
            }*/
        },
        formatter: (params) => {
            let express = Math.round(params.data.Expression * 10000) / 10000;
            return `
                    <div style="text-align: center;">
                        ${params.name.split('_')[1]} 
                        <br/> Type: <strong>${params.data.Cell_Type} </strong>
                        <br/> Stage: <strong>${params.data.Stage}</strong>
                        <br/> #UMI: <strong>${params.data.UMI}</strong>
                        <br/> #Gene: <strong>${params.data.Gene}</strong>
                        <br/> MT%: <strong>${params.data.MT}</strong>
                        ${express != 999 ? "<br/> Expression: <strong>" + express + "</strong>" : ""}
                    </div>
                `;
        },
        grid: {
            top: '15%',
            bottom: '12%',
            left: '10%',
            right: '10%',
        },

    }
};

chrom_colour = {
    type: "RatioBox",
    id: "chrom_colour",
    //debug: true,
    row: 2,
    col: 1,
    choice: ["Cell Type", "Stage"],
    style: {
        width: "350px",
    },
    val: "chrom_colour",
    title: "Colour by",
}

// -------------------------------------------------------------------------------------
const chromium = {
    layout: {
        type: "grid", // grid
        rows: 3,
        cols: 3,
        gap: "1px",
        //debug: true,
        style: {
            //margin: "0px -5% 0px -5%",
            font: "Arial, sans-serif",
        },
    },
    components: [
        chrom_celllayer,
        chrom_colour,
        chrom_searchbar,
        chrom_scatter2d
    ], //,scatter3d
};