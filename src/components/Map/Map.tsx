import map from '../../img/map.png';
import './Map.scss';

export default function Map() {
  return (
    <div className="map-section">
      <div>
        <div className="map-header">
          <h4>Delivery zones</h4>
          <div className="timezones">
            <div className="time-aria">
              <div className="green-dot" />
              <span className="font-18">30 minutes</span>
            </div>
            <div className="time-aria">
              <div className="orange-dot" />
              <span className="font-18">40 minutes</span>
            </div>
            <div className="time-aria">
              <div className="red-dot" />
              <span className="font-18">60 minutes</span>
            </div>
          </div>
        </div>
        <div className="map">
          <img src={map} alt="" />
        </div>
        <div className="map-notes">
          <div className="map-note">
            <span className="note-label font-18">60 minutes or pizza for free</span>
            <span className="note-text font-18">
              If your pizza is not delivered within one hour you will get it free.
            </span>
          </div>
          <div className="map-note">
            <span className="note-label font-18">Time and price</span>
            <span className="note-text font-18">
              Free delivery. We deliver within 30 to 60 minutes.
            </span>
          </div>
          <div className="map-note">
            <span className="note-label font-18">How to pay</span>
            <span className="note-text font-18">
              We accept credit cards or PayPal, and our couriers will happily accept cash.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
