/**
 * Created by jian060 on 13-11-11.
 */

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

sleep(10000);