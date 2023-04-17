import youtube from '../../img/social media/youtube.png';
import vk from '../../img/social media/vk.png';
import ok from '../../img/social media/ok.png';
import zen from '../../img/social media/yandex_zen.png';
import googlePlay from '../../img/downloads/google_play.png';
import appStore from '../../img/downloads/app_store.png';
import appScreen from '../../img/downloads/app_screen.png';
import './Footer.scss';

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="links">
          <div className="wa-pizza">
            <span>WaPizza</span>
            <a href="/">About us</a>
            <a href="/">Blog</a>
            <a href="/">For business</a>
            <a href="/">Excursions and masterclasses</a>
            <a href="/">Why do we cook without gloves?</a>
            <div className="income">
              <div className="number">£ 24,464.585</div>
              <div className="comment">Income of England pizzeria this month.</div>
            </div>
          </div>
          <div className="for-partners">
            <span>For partners</span>
            <a href="/">Franchise</a>
            <a href="/">Investment</a>
            <a href="/">For suppliers</a>
            <a href="/">For rentiers</a>
            <a href="/">Help</a>
            <div className="pizzerias-count">
              <div className="count">821 pizzerias</div>
              <div className="comment">Income of England pizzeria this month.</div>
            </div>
          </div>
          <div className="contacts">
            <div className="number">+44 20 7209 9380</div>
            <div className="email">feedback@wapizza.com</div>
            <div className="social-media">
              <img src={youtube} alt="" />
              <img src={vk} alt="" />
              <img src={ok} alt="" />
              <img src={zen} alt="" />
            </div>
          </div>
          <div className="download">
            <div className="download-label">Download our app</div>
            <div className="download-buttons">
              <img src={googlePlay} alt="" />
              <img src={appStore} alt="" />
            </div>
            <div className="phone-app">
              <img src={appScreen} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
