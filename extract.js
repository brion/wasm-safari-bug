(async function () {
    let fs = require('fs');
    let OGVDemuxerWebM = require('./lib/ogv-demuxer-webm.js');

    function demuxer_init(demuxer) {
        return new Promise((resolve, reject) => {
            demuxer.init(resolve);
        });
    }
    function demuxer_receive_input(demuxer, data) {
        return new Promise((resolve, reject) => {
            demuxer.receiveInput(data, resolve);
        });
    }
    function demuxer_process(demuxer) {
        return new Promise((resolve, reject) => {
            demuxer.process(resolve);
        });
    }
    function demuxer_dequeue_video_packet(demuxer) {
        return new Promise((resolve, reject) => {
            demuxer.dequeueVideoPacket(resolve);
        });
    }

    console.log('Loading input webm');
    let bytes = fs.readFileSync('Graupel_Graupelschauer_2023-04-13_av1.webm');

    console.log('demuxing input...');
    let packets = [];
    let demuxer = await OGVDemuxerWebM({base: 'lib'});
    await demuxer_init(demuxer);
    await demuxer_receive_input(demuxer, bytes);
    while (true) {
        let ret = await demuxer_process(demuxer);
        if (!ret) {
            break;
        }
        if (demuxer.frameReady) {
            let packet = await demuxer_dequeue_video_packet(demuxer);
            packets.push(packet);
        }
    }

    console.log(`${packets.length} video packet(s) extracted`);

    console.log('Saving format and first 2 packets');
    fs.writeFileSync('videoFormat.json', JSON.stringify(demuxer.videoFormat));
    fs.writeFileSync('packet0.dat', new Uint8Array(packets[0]));
    fs.writeFileSync('packet1.dat', new Uint8Array(packets[1]));

})();